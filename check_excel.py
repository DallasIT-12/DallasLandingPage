import pandas as pd

def check_excel():
    try:
        df = pd.read_excel('Book1 - English.xlsx')
        print("Columns:")
        print(df.columns.tolist())
        print("Data sample:")
        print(df.head(2))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_excel()