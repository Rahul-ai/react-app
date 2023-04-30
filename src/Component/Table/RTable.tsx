import React from "react";
import { TabContainer, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Api } from "../../Helpers/axios/axios";
import { TablePagination } from "../Pagination/TablePagination";
import { rTableInterface } from "./rTableInterface";
import { Popup } from "../PopUp/Popup";
import { ExportToCsv } from 'export-to-csv';
import "./RTable.css"

export interface state {
  error: string | null
  isLoaded: boolean
  items: [[], number]
  trigger: boolean
}

export class RTable extends React.Component<rTableInterface> {
  state: state = {
    error: null,
    isLoaded: false,
    items: [[], 1],
    trigger: false,
  };

  private page = 1;
  private limit = 10;

  fetch = async (Update = false) => {
    if (Update) {
      Api.post(this.props.api, { page: this.page, limit: this.limit })
        .then((result: any) => {
          this.setState({
            isLoaded: false,
            items: result || [],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (this.props.api && !Update) {
      return Api.post(this.props.api, { page: this.page, limit: this.limit });
    }
  };

  SrNo(index: number): number {
    return (this.page - 1) * 10 + index;
  }

  componentDidMount(): void {
    if (this.props.api) {
      this.fetch()
        .then((result: any) => {
          this.setState({
            isLoaded: false,
            items: result || [],
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  renderHeading = (struct: any) => {
    return struct.map((head: any) => {
      return <th>{head.name}</th>;
    });
  };

  onDelete = (id: number) => {
    Api.delete(`${this.props.deleteUrl}/${id}`)
      .then(() => {
        this.fetch(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onClick = (event: any) => {
    this.page = parseInt(event.target.text);
    this.fetch(true);
  };

  onClickNext = (event: any) => {
    this.page = this.page+1;
    this.fetch(true);
  };

  onClickPrevious = (event: any) => {
    this.page = this.page-1;
    this.fetch(true);
  };

  onSelectClick = (event: any) => {
    this.limit = event.target.value;
    this.page = 1;
    this.fetch(true);
  };

  renderBody = (data: any) => {
    return data.map((d: any, index: any) => {
      return <tr>{this.renderData(d, index + 1)}</tr>;
    });
  };

  renderData = (data: any, index: any) =>
    this.props.tableStructure?.map((format: any) => {
      if (format.render && format.name === "Action") {
        return <td>{format.render(data, this.onDelete)}</td>;
      } else if (format.render) {
        return <td>{format.render(data, this.SrNo(index))}</td>;
      }
      return <td>{data[format.key]}</td>;
    });

  NrenderHeading = (data: any, action: boolean = true) => {
    let a = Object.keys(data[0]).map((key: any) => {
      return <th>{key}</th>;
    });
    let b = <th>Action</th>;
    if (action) {
      return [...a, b];
    }
    return a;
  };

  NrenderBody = (data: any) => {
    let a = data.map((d: any) => {
      return <tr>{this.NrenderData(d)}</tr>;
    });
    return a;
  };

  NrenderData = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      return <td>{data[key]}</td>;
    });
    let b = (
      <tr>
        <Link to={`/UserForm/${data.id}`}><img width="16px" src="../../../images/edit.svg" alt="edit" /></Link>
        <Link to="#" onClick={() => { this.onDelete(data.id); }}>
          <img width="16px" src="../../../images/delete.svg" alt="delete" />
        </Link>
      </tr>
    );
    return [...a, b];
  };

  ErenderHeading = (data: any, action: boolean = true) => {
    let a = Object.keys(data[0]).map((key: any) => {
      return key;
    });
    return a;
  };

  ErenderBody = (data: any) => {
    let a = data.map((d: any) => {
      return this.ErenderData(d);
    });
    return a;
  };

  ErenderData = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      return data[key];
    });
    return a;
  };

  export = () => {

    let data = this.props.data || this.state.items[0];
    let columns = this.props?.ExportStructure ?
      this.renderHeading(this.props.ExportStructure) : this.ErenderHeading(data, false)

    var today = new Date();
    var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
    var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    var dateTime = date + ' ' + time;
    let filename = `export_${dateTime}.csv`;

    var rows:any = this.ErenderBody(data);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      filename: filename,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: columns,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(rows);
    return;

    // }
    // else{
    // let columns = Object.keys(this.props.rows[0]).map(column => {
    //     return column;
    // });
    // let rows = (this.props.rows);
    // // console.log(rows.length, "Rows to export");

    // var today = new Date();
    // var date = today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();
    // var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    // var dateTime = date + ' ' + time;
    // let filename = `export_${dateTime}.csv`;

    // rows = rows.map(row => {
    //     return Object.keys(row).map((key, index) => {
    //         if (typeof row[key] == 'object' && row[key]) {
    //             return row[key].username ? row[key].username : row[key].id;
    //         } else {
    //             return row[key];
    //         }
    //     });
    //     });


    //     const options = {
    //         fieldSeparator: ',',
    //         quoteStrings: '"',
    //         decimalSeparator: '.',
    //         showLabels: true,
    //         showTitle: false,
    //         filename: filename,
    //         useTextFile: false,
    //         useBom: true,
    //         useKeysAsHeaders: false,
    //         headers: columns
    //     };

    //     const csvExporter = new ExportToCsv(options);

    //     csvExporter.generateCsv(rows);
    //     return;
    // }
  };

  totalPages(): number {
    return Math.ceil(this.state.items[1] / this.limit);
  }

  triggerEvent = (action: boolean) => {
    this.setState({ trigger: action });
  }

  render() {
    if (this.state?.items[0].length !== 0) {
      let params = this.props;
      let trig = this.state.trigger;
      let data = this.props.data || this.state.items[0];
      return (
        <TabContainer key={"TabContainer"}>
          <div className="Buttons">
            {this.props.Addlink && <Link to={this.props.Addlink} type="button" className="btn btn-outline-primary Export" onClick={() => { this.triggerEvent(true) }} >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
              Add New
            </Link>}

            <button type="button" className="btn btn-outline-success Export" onClick={() => { this.export() }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21"
                viewBox="0 0 24 24" fill="#007745" stroke="white" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" /><path d="M16 16l-4-4-4 4" /></svg>
              Export
            </button>

            <button type="button" className="btn btn-outline-secondary searchButton" onClick={() => { this.triggerEvent(true) }} >
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"> </path>
              </svg>
              Search
            </button>
          </div>
          <Popup trigger={trig} setSearch={this.triggerEvent} heading={<h4>Under Dev</h4>}>
            Under development
          </Popup>

          <Table key={"Table"} striped bordered hover>
            <thead>
              <tr>
                {params?.tableStructure
                  ? this.renderHeading(params.tableStructure)
                  : this.NrenderHeading(data)}
              </tr>
            </thead>
            <tbody>
              {params?.tableStructure
                ? this.renderBody(data)
                : this.NrenderBody(data)}
            </tbody>
          </Table>

          <TablePagination
            key={"TablePagination"}
            onSelectClick={this.onSelectClick}
            onClick={this.onClick}
            totalPages={this.totalPages()}
            page={this.page}
            onClickNext={this.onClickNext}
            onClickPrevious={this.onClickPrevious}
          />
        </TabContainer>
      );
    }
    else {
      return <TabContainer key={"TabContainer"}>
        <Table key={"Table"} striped bordered hover>
          <thead>
            <tr>
              <th align="right">nodata</th>
            </tr>
          </thead>
        </Table>
      </TabContainer>
    }
  }
}
