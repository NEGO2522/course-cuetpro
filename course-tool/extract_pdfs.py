import PyPDF2

def extract_pdf_text(filepath, outfile):
    try:
        with open(filepath, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            with open(outfile, 'w', encoding='utf-8') as out:
                for i in range(len(reader.pages)):
                    page = reader.pages[i]
                    text = page.extract_text()
                    out.write(f"--- PAGE {i+1} ---\n")
                    out.write(text)
                    out.write("\n")
        print(f"Extracted {filepath} to {outfile}")
    except Exception as e:
        print(f"Error extracting {filepath}: {e}")

extract_pdf_text('data/19072025_CutOff_UG_Round_One.pdf', 'data/cutoff_text.txt')
extract_pdf_text('data/Merit_Based_Course_Seats.pdf', 'data/seats_text.txt')
