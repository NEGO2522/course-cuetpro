import json
import re
import os

def parse_cutoffs_better(filepath):
    data = []
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
        
    # Clean PDF artifacts safely
    text = re.sub(r'--- PAGE \d+ ---', ' ', text)
    text = text.replace('UNIVERSITY OF DELHI  ADMISSION BRANCH UNDERGRADUATE ADMISSIONS 2025-26 FIRST ROUND OF ALLOCATION AND ADMISSIONS - MINIMUM ALLOCATION SCORE*  ', ' ')
    text = text.replace('*Disclaimer:  1. Allocations are based on the following criteria: program-specific eligibility, merit; social category; availability of seats; tie-breaking rules.  2. The University strives for accuracy. However, applicants are encouraged to report any discrepancies to the Admission Branch, University of Delhi, for timely resolution.  3. The final decision regarding admissions rests solely with the University and is subject to verifications and compliance.', ' ')
    text = re.sub(r'\s+S\.NO\.\s+COLLEGE NAME PROGRAM NAME UR OBC SC ST EWS PwBD\s+', ' ', text)
    
    # The text is squashed. Let's split by S.NO pattern.
    # Pattern: space, digits, space, Capital letter
    chunks = re.split(r'\s(?=\d+\s+[A-Z])', text)
    
    for chunk in chunks:
        chunk = chunk.strip()
        if not re.match(r'^\d+\s+', chunk):
            continue
            
        # Extract S.NO
        sno_match = re.match(r'^(\d+)\s+', chunk)
        sno = sno_match.group(1)
        line_rest = chunk[sno_match.end():]
        
        # Extract scores
        scores = re.findall(r'\b\d{2,3}\.\d+\b', line_rest)
        
        # Remove scores
        text_part = re.sub(r'\b\d{2,3}\.\d+\b', '', line_rest).strip()
        
        # Split college and program
        prog_match = re.search(r'\b(B\.|Bachelor|Five)\b', text_part)
        if prog_match:
            college = text_part[:prog_match.start()].strip()
            program = text_part[prog_match.start():].strip()
        else:
            college = text_part
            program = ""
            
        cutoffs = {
            "UR": scores[0] if len(scores) > 0 else "NA",
            "OBC": scores[1] if len(scores) > 1 else "NA",
            "SC": scores[2] if len(scores) > 2 else "NA",
            "ST": scores[3] if len(scores) > 3 else "NA",
            "EWS": scores[4] if len(scores) > 4 else "NA",
            "PwBD": scores[5] if len(scores) > 5 else "NA"
        }
        
        for k in cutoffs:
            if cutoffs[k] != "NA":
                cutoffs[k] = f"{float(cutoffs[k]):.2f}"
        
        data.append({
            "college": college,
            "program": program,
            "cutoffs": cutoffs
        })
    return data

def parse_seats(filepath):
    data = []
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # seats might also be squashed.
    # Lines or squashed? Let's check seats text.
    lines = text.split('\n')
    current_college = ""
    
    for line in lines:
        line = line.strip()
        m_college = re.match(r'^\s*(\d+)\s+([A-Za-z\s\(\)\&]+)$', line)
        if m_college and ("College" in line or "Mahavidyalaya" in line or "Department" in line or "Institute" in line):
            current_college = m_college.group(2).strip()
            continue
            
        m_prog = re.match(r'^\s*(.*?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(NA|\d+)\s+(Y|N)$', line)
        if m_prog and current_college:
            program = m_prog.group(1).strip()
            seats = {
                "Total": int(m_prog.group(2)),
                "UR": int(m_prog.group(3)),
                "SC": int(m_prog.group(4)),
                "ST": int(m_prog.group(5)),
                "OBC": int(m_prog.group(6)),
                "EWS": int(m_prog.group(7)),
                "Minority": m_prog.group(8),
                "WomenConcession": m_prog.group(9)
            }
            data.append({
                "college": current_college,
                "program": program,
                "seats": seats
            })
    return data

def normalize_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]', '', text)
    return text

def merge_data(cutoffs, seats):
    merged = []
    for c in cutoffs:
        c_norm_col = normalize_text(c['college'])
        c_norm_prog = normalize_text(c['program'])
        
        matched_seat = None
        for s in seats:
            s_norm_col = normalize_text(s['college'])
            s_norm_prog = normalize_text(s['program'])
            
            if s_norm_col in c_norm_col or c_norm_col in s_norm_col:
                if s_norm_prog in c_norm_prog or c_norm_prog in s_norm_prog:
                    matched_seat = s['seats']
                    break
        
        merged.append({
            "college": c['college'],
            "program": c['program'],
            "cutoffs": c['cutoffs'],
            "seats": matched_seat if matched_seat else {
                "Total": "NA", "UR": "NA", "SC": "NA", "ST": "NA", "OBC": "NA", "EWS": "NA", "Minority": "NA", "WomenConcession": "NA"
            }
        })
    return merged

if __name__ == "__main__":
    cutoffs = parse_cutoffs_better('data/cutoff_text.txt')
    seats = parse_seats('data/seats_text.txt')
    merged = merge_data(cutoffs, seats)
    
    os.makedirs('src/data', exist_ok=True)
    with open('src/data/colleges.json', 'w', encoding='utf-8') as f:
        json.dump(merged, f, indent=2)
    print(f"Exported {len(merged)} records to src/data/colleges.json")
