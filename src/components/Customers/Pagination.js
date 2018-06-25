import React from "react";

export default class Pagination extends React.Component {
  render() {
    const { totalPages, handleClick, currentPage } = this.props;
    const page = [];
    for (let i = 1; i <= totalPages; i++) {
      page[i] = i;
    }

    return (
      <div className="mt-5">
        <nav
          className="nav justify-content-center"
          aria-label="Page navigation example"
        >
          <ul className="pagination">
            {page.map(p => {
              const cn = currentPage === p ? "active" : "";
              return (
                <li key={p} className={"page-item " + cn}>
                  <a className="page-link" onClick={() => handleClick(p)}>
                    {p}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}
