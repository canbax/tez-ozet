const XLSX = require("xlsx");
import { SEARCH_TERM, SUBJECT_FILTER } from "../../vars";

context("Actions", () => {
  beforeEach(() => {
    cy.visit("https://tez.yok.gov.tr/UlusalTezMerkezi/giris.jsp");
  });

  let table = [];
  const tableCols = [
    "No",
    "Thesis No",
    "Author",
    "Year",
    "Thesis Name",
    "Thesis Type",
    "Subject",
  ];
  let isDone = false;

  function write2file(pageNum) {
    if (table.length < 1) {
      isDone = true;
      return;
    }
    cy.writeFile("table" + pageNum + ".json", JSON.stringify(table, null, 2));
    const workSheet = XLSX.utils.json_to_sheet(table);
    let workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet);
    XLSX.writeFile(workBook, "out" + pageNum + ".xlsx");
  }

  function processTable(pageNum) {
    cy.get("table.watable>tbody>tr")
      .each(($el) => {
        const cols = $el[0].children;
        console.log("cols: ", cols);
        const row = {};
        for (let i = 0; i < cols.length; i++) {
          if (isDone) {
            write2file(pageNum);
            return;
          }
          if (i == 1) {
            // click to thesis no
            if (!cols[i] || !cols[i].children[0]) {
              isDone = true;
              write2file(pageNum);
              return;
            }
            cy.wrap(cols[i].children[0]).click();
            // click to download PDF
            cy.scrollTo("top", { ensureScrollable: false });

            cy.get("td#td0").then(($el2) => {
              row["trSummary"] = $el2.text();
            });

            cy.get("td#td1").then(($el2) => {
              row["enSummary"] = $el2.text();
            });
            cy.scrollTo("top", { ensureScrollable: false });
            // click to close popup window
            cy.get("a.ui-dialog-titlebar-close.ui-corner-all").click();
          }
          row[tableCols[i]] = cols[i].textContent;
        }
        table.push(row);
      })
      .then(() => {
        write2file(pageNum);
        try {
          cy.get(`a[href='#top4']`)
            .parent()
            .then(($btn) => {
              if ($btn.hasClass("disabled")) {
                isDone = true;
              }
              cy.get(`a[href='#top4']`).click();
              pageNum = pageNum + 1;
              table = [];
              if (!isDone) {
                processTable(pageNum);
              }
            });
        } catch (e) {
          isDone = true;
          return;
        }
      });
  }

  it(".type() - type into a DOM element", () => {
    // https://on.cypress.io/type
    cy.get("#neden").type(SEARCH_TERM).should("have.value", SEARCH_TERM);
    cy.get('select[name="nevi"]').select("7");
    cy.get(`input[name='kaydet']`).click();
    if (SUBJECT_FILTER && SUBJECT_FILTER.length > 0) {
      cy.get(`input.filter`).eq(4).type(SUBJECT_FILTER);
      cy.wait(500);
    }
    cy.scrollTo("top", { ensureScrollable: false });
    let pageCnt = 1;
    processTable(pageCnt);
  });
});
