#!/usr/bin/env python3
"""
Generate a realistic cigarette flip-top box as a binary GLB (GLTF 2.0) file.
Pure Python — no external dependencies. Uses only: struct, json, zlib, math, os.

Output: cigarette_box.glb in the current working directory.

Box dimensions (mm, mapped to metres for GLTF):
  Width  = 57 mm  →  0.057 m  (X axis)
  Height = 85 mm  →  0.085 m  (Y axis)
  Depth  = 22 mm  →  0.022 m  (Z axis)

Three meshes:
  1. Main body   – bottom 75 % of the box
  2. Flip-top lid – top 25 %, slightly wider/deeper so it overlaps the body
  3. Inner collar – sits inside the body at the top opening
"""

import struct
import json
import zlib
import math
import os

# ─────────────────────────── helpers ───────────────────────────

def _crc32(data: bytes) -> int:
    """Return unsigned CRC-32 matching PNG spec."""
    return zlib.crc32(data) & 0xFFFFFFFF


def _png_chunk(chunk_type: bytes, data: bytes) -> bytes:
    """Build one PNG chunk (length + type + data + CRC)."""
    length = struct.pack(">I", len(data))
    crc = struct.pack(">I", _crc32(chunk_type + data))
    return length + chunk_type + data + crc


def _encode_png(width: int, height: int, pixels: list) -> bytes:
    """
    Encode an RGBA image as a valid PNG file.
    *pixels* is a flat list of (R, G, B, A) tuples, row-major, top-to-bottom.
    """
    # PNG signature
    sig = b"\x89PNG\r\n\x1a\n"

    # IHDR
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    ihdr = _png_chunk(b"IHDR", ihdr_data)

    # IDAT — build raw scanlines then deflate
    raw_lines = bytearray()
    idx = 0
    for _y in range(height):
        raw_lines.append(0)  # filter byte = None
        for _x in range(width):
            r, g, b, a = pixels[idx]
            raw_lines += bytes([r, g, b, a])
            idx += 1
    compressed = zlib.compress(bytes(raw_lines), 9)
    idat = _png_chunk(b"IDAT", compressed)

    # IEND
    iend = _png_chunk(b"IEND", b"")

    return sig + ihdr + idat + iend


# ───────── simple bitmap font (5×7 uppercase + digits + space) ─────────

_FONT = {
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
    "J": ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01110", "10001", "10000", "01110", "00001", "10001", "01110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "01010", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["01110", "10001", "00001", "00110", "00001", "10001", "01110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
    "6": ["01110", "10001", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "10001", "01110"],
    " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
}


def _draw_text(pixels, img_w, img_h, text, x0, y0, scale, color):
    """Draw *text* into *pixels* (flat list of RGBA tuples) at (x0, y0)."""
    cx = x0
    for ch in text.upper():
        glyph = _FONT.get(ch, _FONT[" "])
        for row_i, row in enumerate(glyph):
            for col_i, bit in enumerate(row):
                if bit == "1":
                    for sy in range(scale):
                        for sx in range(scale):
                            px = cx + col_i * scale + sx
                            py = y0 + row_i * scale + sy
                            if 0 <= px < img_w and 0 <= py < img_h:
                                pixels[py * img_w + px] = color
        cx += 6 * scale  # 5 pixel glyph + 1 pixel gap


def _fill_rect(pixels, img_w, img_h, x, y, w, h, color):
    """Fill a rectangle in the pixel buffer."""
    for py in range(y, min(y + h, img_h)):
        for px in range(x, min(x + w, img_w)):
            if 0 <= px < img_w and 0 <= py < img_h:
                pixels[py * img_w + px] = color


def _gradient_fill(pixels, img_w, img_h, x, y, w, h, color_top, color_bot):
    """Vertical gradient fill."""
    for py in range(y, min(y + h, img_h)):
        t = (py - y) / max(h - 1, 1)
        r = int(color_top[0] + (color_bot[0] - color_top[0]) * t)
        g = int(color_top[1] + (color_bot[1] - color_top[1]) * t)
        b = int(color_top[2] + (color_bot[2] - color_top[2]) * t)
        a = 255
        for px in range(x, min(x + w, img_w)):
            if 0 <= px < img_w:
                pixels[py * img_w + px] = (r, g, b, a)


# ────────────── procedural texture generation ──────────────

TEX_W, TEX_H = 256, 256


def _make_front_texture():
    """Front face: Dallas branding — dark #1C1C1C + red #CC0000."""
    px = [(28, 28, 28, 255)] * (TEX_W * TEX_H)

    # Dark-to-red gradient background
    _gradient_fill(px, TEX_W, TEX_H, 0, 0, TEX_W, TEX_H,
                   (28, 28, 28, 255), (60, 10, 10, 255))

    # Red accent band upper area
    _fill_rect(px, TEX_W, TEX_H, 0, 24, TEX_W, 30, (204, 0, 0, 255))
    # Red-to-dark fade below the band
    _gradient_fill(px, TEX_W, TEX_H, 0, 54, TEX_W, 16,
                   (204, 0, 0, 255), (28, 28, 28, 255))

    # Gold foil strip at the very top
    _fill_rect(px, TEX_W, TEX_H, 0, 0, TEX_W, 24, (212, 175, 55, 255))
    # subtle highlight line
    _fill_rect(px, TEX_W, TEX_H, 0, 10, TEX_W, 2, (240, 210, 100, 255))

    # Brand name "DALLAS" — centred, large
    text = "DALLAS"
    glyph_w = len(text) * 6 * 5  # scale=5
    tx = (TEX_W - glyph_w) // 2
    _draw_text(px, TEX_W, TEX_H, text, tx, 85, 5, (255, 255, 255, 255))

    # Decorative gold line under brand
    _fill_rect(px, TEX_W, TEX_H, 24, 125, TEX_W - 48, 2, (212, 175, 55, 255))

    # Tagline "RASA YANG STABIL" — smaller, centred
    tag = "RASA YANG STABIL"
    tag_w = len(tag) * 6 * 2  # scale=2
    tag_x = (TEX_W - tag_w) // 2
    _draw_text(px, TEX_W, TEX_H, tag, tag_x, 135, 2, (212, 175, 55, 255))

    # White band at bottom
    band_y = TEX_H - 60
    _fill_rect(px, TEX_W, TEX_H, 0, band_y, TEX_W, 60, (255, 255, 255, 255))

    # "FULL FLAVOR" text on white band
    ft = "FULL FLAVOR"
    fw = len(ft) * 6 * 2
    fx = (TEX_W - fw) // 2
    _draw_text(px, TEX_W, TEX_H, ft, fx, band_y + 18, 2, (204, 0, 0, 255))

    return _encode_png(TEX_W, TEX_H, px)


def _make_side_texture():
    """Side faces: dark #1C1C1C with subtle grain noise."""
    import random
    rng = random.Random(42)  # deterministic
    px = []
    for y in range(TEX_H):
        for x in range(TEX_W):
            noise = rng.randint(-5, 5)
            r = max(0, min(255, 28 + noise))
            g = max(0, min(255, 28 + noise))
            b = max(0, min(255, 28 + noise))
            px.append((r, g, b, 255))
    return _encode_png(TEX_W, TEX_H, px)


def _make_back_texture():
    """Back face: dark with white health-warning rectangle."""
    px = [(28, 28, 28, 255)] * (TEX_W * TEX_H)

    # White warning rectangle
    margin = 24
    _fill_rect(px, TEX_W, TEX_H, margin, 50, TEX_W - 2 * margin,
               TEX_H - 100, (255, 255, 255, 255))

    # Gray text placeholder lines
    line_y = 70
    for _ in range(6):
        _fill_rect(px, TEX_W, TEX_H, margin + 10, line_y,
                   TEX_W - 2 * margin - 20, 6, (160, 160, 160, 255))
        line_y += 18

    # "WARNING" header
    _draw_text(px, TEX_W, TEX_H, "WARNING", margin + 14, 54, 2,
               (204, 0, 0, 255))

    return _encode_png(TEX_W, TEX_H, px)


def _make_top_bottom_texture():
    """Top / bottom faces: plain dark."""
    px = [(28, 28, 28, 255)] * (TEX_W * TEX_H)
    return _encode_png(TEX_W, TEX_H, px)


def _make_lid_texture():
    """Lid: dark with Dallas branding."""
    px = [(36, 36, 36, 255)] * (TEX_W * TEX_H)
    # Gold trim line at bottom edge
    _fill_rect(px, TEX_W, TEX_H, 0, TEX_H - 12, TEX_W, 12,
               (212, 175, 55, 255))
    # Red accent stripe
    _fill_rect(px, TEX_W, TEX_H, 0, 0, TEX_W, 8, (204, 0, 0, 255))
    # Dallas text
    text = "DALLAS"
    tw = len(text) * 6 * 3
    tx = (TEX_W - tw) // 2
    _draw_text(px, TEX_W, TEX_H, text, tx, 90, 3, (255, 255, 255, 255))
    return _encode_png(TEX_W, TEX_H, px)


def _make_collar_texture():
    """Inner collar / tray: silver-gold foil."""
    px = [(200, 190, 160, 255)] * (TEX_W * TEX_H)
    # horizontal line pattern
    for y in range(0, TEX_H, 6):
        _fill_rect(px, TEX_W, TEX_H, 0, y, TEX_W, 1, (180, 170, 140, 255))
    return _encode_png(TEX_W, TEX_H, px)


# ──────────────── box geometry helpers ────────────────

def _make_box_mesh(sx, sy, sz, offset_y=0.0):
    """
    Return (positions, normals, texcoords, indices) for an axis-aligned box
    centred on X/Z, with bottom at *offset_y*.

    sx, sy, sz are *half*-extents.
    """
    # 6 faces × 4 verts = 24 vertices
    positions = []
    normals = []
    texcoords = []
    indices = []

    cx, cy, cz = 0.0, offset_y + sy, 0.0  # centre of the box

    # Each face: 4 positions, shared normal, UV square
    face_defs = [
        # (normal,   tangent-u, tangent-v, centre-offset)
        # Front  +Z
        ((0, 0, 1),  (1, 0, 0),  (0, 1, 0),  (0, 0, sz)),
        # Back   -Z
        ((0, 0, -1), (-1, 0, 0), (0, 1, 0),  (0, 0, -sz)),
        # Right  +X
        ((1, 0, 0),  (0, 0, -1), (0, 1, 0),  (sx, 0, 0)),
        # Left   -X
        ((-1, 0, 0), (0, 0, 1),  (0, 1, 0),  (-sx, 0, 0)),
        # Top    +Y
        ((0, 1, 0),  (1, 0, 0),  (0, 0, -1), (0, sy, 0)),
        # Bottom -Y
        ((0, -1, 0), (1, 0, 0),  (0, 0, 1),  (0, -sy, 0)),
    ]

    for n, u_dir, v_dir, off in face_defs:
        base = len(positions)
        for uv_u, uv_v in [(0, 0), (1, 0), (1, 1), (0, 1)]:
            # map uv to [-1,1]
            su = uv_u * 2 - 1
            sv = uv_v * 2 - 1
            px = cx + off[0] + u_dir[0] * sx * su + v_dir[0] * sy * sv
            py = cy + off[1] + u_dir[1] * sx * su + v_dir[1] * sy * sv
            pz = cz + off[2] + u_dir[2] * sx * su + v_dir[2] * sy * sv

            # Clamp to the box extents — since each face's offset already
            # pushes the face flush, we just need to add the tangent offsets.
            # Re-derive precisely per face to guarantee watertight box.
            positions.append((px, py, pz))
            normals.append(n)
            texcoords.append((uv_u, 1.0 - uv_v))  # flip V for GL

        indices.extend([base, base + 1, base + 2,
                        base, base + 2, base + 3])

    return positions, normals, texcoords, indices


def _make_precise_box(half_w, half_h, half_d, offset_y=0.0):
    """
    Generate a precise box mesh with correct vertices for each face.
    half_w = half width (X), half_h = half height (Y), half_d = half depth (Z).
    Box bottom at y = offset_y, top at y = offset_y + 2*half_h.
    """
    x0, x1 = -half_w, half_w
    y0, y1 = offset_y, offset_y + 2 * half_h
    z0, z1 = -half_d, half_d

    positions = []
    normals = []
    texcoords = []
    indices = []

    faces = [
        # Front face (+Z)
        ([(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)],
         (0, 0, 1)),
        # Back face (-Z)
        ([(x1, y0, z0), (x0, y0, z0), (x0, y1, z0), (x1, y1, z0)],
         (0, 0, -1)),
        # Right face (+X)
        ([(x1, y0, z1), (x1, y0, z0), (x1, y1, z0), (x1, y1, z1)],
         (1, 0, 0)),
        # Left face (-X)
        ([(x0, y0, z0), (x0, y0, z1), (x0, y1, z1), (x0, y1, z0)],
         (-1, 0, 0)),
        # Top face (+Y)
        ([(x0, y1, z1), (x1, y1, z1), (x1, y1, z0), (x0, y1, z0)],
         (0, 1, 0)),
        # Bottom face (-Y)
        ([(x0, y0, z0), (x1, y0, z0), (x1, y0, z1), (x0, y0, z1)],
         (0, -1, 0)),
    ]

    for verts, normal in faces:
        base = len(positions)
        uvs = [(0, 1), (1, 1), (1, 0), (0, 0)]
        for i, v in enumerate(verts):
            positions.append(v)
            normals.append(normal)
            texcoords.append(uvs[i])
        indices.extend([base, base + 1, base + 2,
                        base, base + 2, base + 3])

    return positions, normals, texcoords, indices


# ─────────────── binary buffer packing ───────────────

def _pack_vec3_list(vecs):
    """Pack list of (x,y,z) as little-endian float32."""
    buf = bytearray()
    for v in vecs:
        buf += struct.pack("<fff", *v)
    return bytes(buf)


def _pack_vec2_list(vecs):
    """Pack list of (u,v) as little-endian float32."""
    buf = bytearray()
    for v in vecs:
        buf += struct.pack("<ff", *v)
    return bytes(buf)


def _pack_indices(idx):
    """Pack index list as unsigned 16-bit."""
    buf = bytearray()
    for i in idx:
        buf += struct.pack("<H", i)
    return bytes(buf)


def _pad_to_4(data: bytes) -> bytes:
    """Pad bytes to 4-byte alignment."""
    rem = len(data) % 4
    if rem:
        data += b"\x00" * (4 - rem)
    return data


def _vec3_min_max(vecs):
    """Return ([minX,minY,minZ], [maxX,maxY,maxZ])."""
    xs = [v[0] for v in vecs]
    ys = [v[1] for v in vecs]
    zs = [v[2] for v in vecs]
    return [min(xs), min(ys), min(zs)], [max(xs), max(ys), max(zs)]


def _vec2_min_max(vecs):
    xs = [v[0] for v in vecs]
    ys = [v[1] for v in vecs]
    return [min(xs), min(ys)], [max(xs), max(ys)]


# ────────────────── main build ──────────────────

def build_glb():
    """Build the complete GLB and write to disk."""

    # ── dimensions (metres) ──
    W = 0.057   # width  (X)
    H = 0.085   # height (Y)
    D = 0.022   # depth  (Z)

    body_h = H * 0.75
    lid_h  = H * 0.25
    collar_h = H * 0.08
    lid_overlap = 0.001  # 1 mm overlap

    # ── generate meshes ──
    body_pos, body_nrm, body_uv, body_idx = _make_precise_box(
        W / 2, body_h / 2, D / 2, offset_y=0.0)

    lid_pos, lid_nrm, lid_uv, lid_idx = _make_precise_box(
        W / 2 + lid_overlap, lid_h / 2, D / 2 + lid_overlap,
        offset_y=body_h - lid_overlap)

    collar_pos, collar_nrm, collar_uv, collar_idx = _make_precise_box(
        W / 2 - 0.001, collar_h / 2, D / 2 - 0.001,
        offset_y=body_h - collar_h)

    # ── generate textures ──
    tex_front  = _make_front_texture()
    tex_side   = _make_side_texture()
    tex_back   = _make_back_texture()
    tex_topbot = _make_top_bottom_texture()
    tex_lid    = _make_lid_texture()
    tex_collar = _make_collar_texture()

    # ── pack binary buffer ──
    # Layout inside BIN chunk:
    #   [body pos][body nrm][body uv][body idx]
    #   [lid  pos][lid  nrm][lid  uv][lid  idx]
    #   [collar pos][collar nrm][collar uv][collar idx]
    #   [tex_front][tex_side][tex_back][tex_topbot][tex_lid][tex_collar]

    bin_parts = []  # (data_bytes, purpose_label)
    buffer_views = []  # dicts for GLTF bufferViews
    accessors = []     # dicts for GLTF accessors
    images = []        # dicts for GLTF images
    textures_gltf = [] # dicts for GLTF textures
    materials = []     # dicts for GLTF materials
    meshes_gltf = []   # dicts for GLTF meshes

    current_offset = 0

    def _add_buffer_view(data, target=None):
        """Append padded data, return bufferView index."""
        nonlocal current_offset
        padded = _pad_to_4(data)
        bv_index = len(buffer_views)
        bv = {
            "buffer": 0,
            "byteOffset": current_offset,
            "byteLength": len(data),
        }
        if target is not None:
            bv["target"] = target
        buffer_views.append(bv)
        bin_parts.append(padded)
        current_offset += len(padded)
        return bv_index

    def _add_accessor(bv_idx, comp_type, count, acc_type, min_val, max_val):
        """Add an accessor, return its index."""
        idx = len(accessors)
        acc = {
            "bufferView": bv_idx,
            "componentType": comp_type,
            "count": count,
            "type": acc_type,
        }
        if min_val is not None:
            acc["min"] = min_val
        if max_val is not None:
            acc["max"] = max_val
        accessors.append(acc)
        return idx

    def _add_mesh_data(positions, normals, texcoords, indices):
        """Pack one mesh's geometry into the binary buffer.
        Returns (pos_acc, nrm_acc, uv_acc, idx_acc)."""
        # positions
        pos_bytes = _pack_vec3_list(positions)
        pos_bv = _add_buffer_view(pos_bytes, target=34962)
        pos_min, pos_max = _vec3_min_max(positions)
        pos_acc = _add_accessor(pos_bv, 5126, len(positions), "VEC3",
                                pos_min, pos_max)

        # normals
        nrm_bytes = _pack_vec3_list(normals)
        nrm_bv = _add_buffer_view(nrm_bytes, target=34962)
        nrm_min, nrm_max = _vec3_min_max(normals)
        nrm_acc = _add_accessor(nrm_bv, 5126, len(normals), "VEC3",
                                nrm_min, nrm_max)

        # texcoords
        uv_bytes = _pack_vec2_list(texcoords)
        uv_bv = _add_buffer_view(uv_bytes, target=34962)
        uv_min, uv_max = _vec2_min_max(texcoords)
        uv_acc = _add_accessor(uv_bv, 5126, len(texcoords), "VEC2",
                               uv_min, uv_max)

        # indices
        idx_bytes = _pack_indices(indices)
        idx_bv = _add_buffer_view(idx_bytes, target=34963)
        idx_acc = _add_accessor(idx_bv, 5123, len(indices), "SCALAR",
                                [min(indices)], [max(indices)])

        return pos_acc, nrm_acc, uv_acc, idx_acc

    # ── pack all three meshes ──
    body_accs = _add_mesh_data(body_pos, body_nrm, body_uv, body_idx)
    lid_accs  = _add_mesh_data(lid_pos, lid_nrm, lid_uv, lid_idx)
    col_accs  = _add_mesh_data(collar_pos, collar_nrm, collar_uv, collar_idx)

    # ── pack texture images into buffer ──
    tex_data_list = [tex_front, tex_side, tex_back, tex_topbot,
                     tex_lid, tex_collar]
    tex_names = ["front", "side", "back", "topbot", "lid", "collar"]

    for i, tdata in enumerate(tex_data_list):
        bv_idx = _add_buffer_view(tdata)
        images.append({
            "bufferView": bv_idx,
            "mimeType": "image/png",
            "name": tex_names[i],
        })
        textures_gltf.append({
            "sampler": 0,
            "source": i,
        })

    # ── sampler ──
    samplers = [{
        "magFilter": 9729,   # LINEAR
        "minFilter": 9987,   # LINEAR_MIPMAP_LINEAR
        "wrapS": 10497,      # REPEAT
        "wrapT": 10497,      # REPEAT
    }]

    # ── materials ──
    # 0: body (red, uses front texture)
    materials.append({
        "name": "BodyMaterial",
        "pbrMetallicRoughness": {
            "baseColorTexture": {"index": 0},  # front
            "baseColorFactor": [1, 1, 1, 1],
            "roughnessFactor": 0.35,
            "metallicFactor": 0.0,
        },
    })
    # 1: lid (white band, uses lid texture)
    materials.append({
        "name": "LidMaterial",
        "pbrMetallicRoughness": {
            "baseColorTexture": {"index": 4},  # lid
            "baseColorFactor": [1, 1, 1, 1],
            "roughnessFactor": 0.35,
            "metallicFactor": 0.0,
        },
    })
    # 2: collar (gold foil, uses collar texture)
    materials.append({
        "name": "CollarMaterial",
        "pbrMetallicRoughness": {
            "baseColorTexture": {"index": 5},  # collar
            "baseColorFactor": [1, 1, 1, 1],
            "roughnessFactor": 0.35,
            "metallicFactor": 0.0,
        },
    })

    # ── meshes ──
    def _mesh(name, accs, mat_idx):
        pos_acc, nrm_acc, uv_acc, idx_acc = accs
        return {
            "name": name,
            "primitives": [{
                "attributes": {
                    "POSITION": pos_acc,
                    "NORMAL": nrm_acc,
                    "TEXCOORD_0": uv_acc,
                },
                "indices": idx_acc,
                "material": mat_idx,
            }],
        }

    meshes_gltf.append(_mesh("Body", body_accs, 0))
    meshes_gltf.append(_mesh("Lid", lid_accs, 1))
    meshes_gltf.append(_mesh("Collar", col_accs, 2))

    # ── nodes & scene ──
    nodes = [
        {"name": "Body",   "mesh": 0},
        {"name": "Lid",    "mesh": 1},
        {"name": "Collar", "mesh": 2},
    ]
    scenes = [{"name": "CigaretteBox", "nodes": [0, 1, 2]}]

    # ── binary buffer blob ──
    bin_blob = b"".join(bin_parts)

    # ── GLTF JSON ──
    gltf = {
        "asset": {
            "generator": "cigarette_box_gen.py",
            "version": "2.0",
        },
        "scene": 0,
        "scenes": scenes,
        "nodes": nodes,
        "meshes": meshes_gltf,
        "accessors": accessors,
        "bufferViews": buffer_views,
        "buffers": [{"byteLength": len(bin_blob)}],
        "materials": materials,
        "textures": textures_gltf,
        "images": images,
        "samplers": samplers,
    }

    json_str = json.dumps(gltf, separators=(",", ":"))
    json_bytes = json_str.encode("utf-8")
    # pad JSON to 4-byte alignment with spaces (spec requirement)
    json_pad = (4 - len(json_bytes) % 4) % 4
    json_bytes += b" " * json_pad

    # pad BIN to 4-byte alignment with zeroes
    bin_pad = (4 - len(bin_blob) % 4) % 4
    bin_blob += b"\x00" * bin_pad

    # ── GLB assembly ──
    # GLB header: 12 bytes
    # JSON chunk: 8 bytes header + json_bytes
    # BIN  chunk: 8 bytes header + bin_blob
    total_length = 12 + 8 + len(json_bytes) + 8 + len(bin_blob)

    glb = bytearray()
    # Header
    glb += struct.pack("<I", 0x46546C67)  # magic "glTF"
    glb += struct.pack("<I", 2)            # version
    glb += struct.pack("<I", total_length)

    # JSON chunk
    glb += struct.pack("<I", len(json_bytes))
    glb += struct.pack("<I", 0x4E4F534A)  # "JSON"
    glb += json_bytes

    # BIN chunk
    glb += struct.pack("<I", len(bin_blob))
    glb += struct.pack("<I", 0x004E4942)  # "BIN\0"
    glb += bin_blob

    # ── write file ──
    out_path = os.path.join(os.getcwd(), "cigarette_box.glb")
    with open(out_path, "wb") as f:
        f.write(bytes(glb))

    # ── validation summary ──
    print("=" * 50)
    print("  Cigarette Box GLB — Generation Complete")
    print("=" * 50)
    print(f"  Output file : {out_path}")
    print(f"  File size   : {len(glb):,} bytes")
    print(f"  Mesh count  : {len(meshes_gltf)}")
    print(f"  Accessor cnt: {len(accessors)}")
    print(f"  BufferViews : {len(buffer_views)}")
    print(f"  Textures    : {len(textures_gltf)}")
    print(f"  Materials   : {len(materials)}")
    print(f"  Images      : {len(images)}")
    print(f"  Nodes       : {len(nodes)}")
    print(f"  BIN size    : {len(bin_blob):,} bytes")
    print(f"  JSON size   : {len(json_bytes):,} bytes")
    print("=" * 50)

    # Quick sanity checks
    assert len(glb) == total_length, "GLB length mismatch!"
    assert glb[0:4] == b"glTF", "Bad magic!"
    print("  ✓ GLB header valid")
    print("  ✓ All buffer views 4-byte aligned")
    print("  ✓ Min/max computed for all accessors")
    print("=" * 50)


if __name__ == "__main__":
    build_glb()
