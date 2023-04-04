import React from "react";
import { TabContainer, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Api } from "../../Helpers/axios/axios";
import { TablePagination } from "../Pagination/TablePagination";
import { rTableInterface } from "./rTableInterface";

export class RTable extends React.Component<rTableInterface> {
  state = {
    error: null,
    isLoaded: false,
    items: [],
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
      if (format.render && format.name == "Action") {
        console.log(format.name);
        return <td>{format.render(data, this.onDelete)}</td>;
      } else if (format.render) {
        return <td>{format.render(data, this.SrNo(index))}</td>;
      }
      return <td>{data[format.key]}</td>;
    });

  NrenderHeading = (data: any) => {
    let a = Object.keys(data[0]).map((key: any) => {
      return <th>{key}</th>;
    });
    let b = <th>Action</th>;
    return [...a, b];
  };

  NrenderBody = (data: any) => {
    return data.map((d: any) => {
      return <tr>{this.NrenderData(d)}</tr>;
    });
  };

  NrenderData = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      return <td>{data[key]}</td>;
    });
    let b = (
      <tr>
        <Link to={`/UserForm/${data.id}`}>Edit </Link>
        <Link to="#" onClick={() => {this.onDelete(data.id);}}>
          Delete
        </Link>
      </tr>
    );
    return [...a, b];
  };

  totalPages(): number {
    return Math.ceil(this.state.items[1] / this.limit);
  }

  render() {
    if (this.state.items.length !== 0) {
      let params = this.props;
      let data: [] = this.props.data || this.state.items[0];
      return (
        <TabContainer key={"TabContainer"}>
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
          />
        </TabContainer>
      );
    }
  }
}
