export function groupPrograms(data) {
  const grouped = {};

  data.forEach(item => {
    const prog = item.program;
    if (!prog) return;

    if (!grouped[prog]) {
      // Determine category based on keywords
      let category = "Other";
      if (prog.includes("B.A.") || prog.includes("B.A ")) {
        if (prog.includes("Hindi") || prog.includes("Sanskrit") || prog.includes("English") || prog.includes("Urdu") || prog.includes("Punjabi") || prog.includes("Bengali") || prog.includes("Arabic") || prog.includes("Persian") || prog.includes("French") || prog.includes("German") || prog.includes("Italian") || prog.includes("Spanish")) {
          category = "Languages";
        } else {
          category = "Arts & Social Sciences";
        }
      } else if (prog.includes("B.Sc") || prog.includes("B.Tech") || prog.includes("Science") || prog.includes("Math")) {
        category = "Science, Math & Tech";
      } else if (prog.includes("B.Com") || prog.includes("Management") || prog.includes("Business") || prog.includes("BBA") || prog.includes("BMS")) {
        category = "Commerce & Management";
      } else if (prog.includes("Voc") || prog.includes("Vocational")) {
        category = "Vocational";
      } else if (prog.includes("Music") || prog.includes("Fine Art") || prog.includes("BFA")) {
        category = "Music & Fine Arts";
      } else if (prog.includes("Education") || prog.includes("B.El.Ed")) {
        category = "Education";
      }

      grouped[prog] = {
        program: prog,
        category: category,
        colleges: 0,
        totalSeats: 0,
        topCutoff: 0,
        collegesList: [],
        records: []
      };
    }

    grouped[prog].colleges += 1;
    grouped[prog].collegesList.push(item.college);
    grouped[prog].records.push(item);
    
    const seats = item.seats?.Total;
    if (typeof seats === 'number') {
      grouped[prog].totalSeats += seats;
    }

    // Determine top cutoff (using UR as baseline for "Top Cutoff" or across all)
    const urCutoff = parseFloat(item.cutoffs?.UR);
    if (!isNaN(urCutoff) && urCutoff > grouped[prog].topCutoff) {
      grouped[prog].topCutoff = urCutoff;
    }
  });

  return Object.values(grouped).sort((a, b) => a.program.localeCompare(b.program));
}
