import React from "react";
import { Pagination, TabContainer, Table } from "react-bootstrap";
import { Api } from "../../Helpers/axios/axios";
import { TablePagination } from "../Pagination/TablePagination";
import { rTableInterface } from "./rTableInterface";

export class RTable extends React.Component<any> {
    state = {
      error: null,
      isLoaded: false,
      limit:10,
      page:1,
      items: [],
    };

  fetch = async () => {
    // if(this.props.api)
    // {
      console.log(await Api.post("user/withPagination",this.state));
    // }
  };

  componentDidMount(): void {
       this.fetch();
      // .then((result: any) => {
      //   console.log(result);
      //   this.setState({
      //     isLoaded: true,
      //     items: result,
      //   });
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      // .finally(() => {
      //   this.setState({
      //     isLoaded: false,
      //   });
      // });
  }

  renderHeading = (struct: any) => {
    return struct.map((head: any) => {
      return <th>{head.name}</th>;
    });
  };

  renderBody = (data: any) => {
    return data.map((d: any) => {
      return <tr>{this.renderData(d)}</tr>;
    });
  };

  renderData = (data: any) =>
    this.props.tableStructure.map((format: any) => {
      if (format.render) {
        return <td>{format.render(data)}</td>;
      }
      return <td>{data[format.key]}</td>;
    });

  NrenderHeading = (data: any) => {
    return Object.keys(data[0]).map((key: any) => {
      return <th>{key}</th>;
    });
  };

  NrenderBody = (data: any) => {
    return data.map((d: any) => {
      return <tr>{this.NrenderData(d)}</tr>;
    });
  };

  NrenderData = (data: any) =>
    Object.keys(data).map((key: any) => {
      return <td>{data[key]}</td>;
    });

  render() {
    let params = this.props;
    let data: [] = this.props.data || this.state.items;
    return (
      <TabContainer>
        <Table striped bordered hover>
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
        <TablePagination totalPages={5} />
      </TabContainer>
    );
  }
}
