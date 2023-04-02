import React from "react";
import { TabContainer, Table } from "react-bootstrap";
import { Api } from "../../Helpers/axios/axios";
import { TablePagination } from "../Pagination/TablePagination";
import { rTableInterface } from "./rTableInterface";

export class RTable  extends React.Component<rTableInterface> {
    state = {
      error: null,
      isLoaded: false,
      limit:10,
      page:1,
      items: [],
    };

  fetch = async () => {
    if(this.props.api)
    {
      return Api.post(this.props.api,this.state);
    }
  };

  componentDidMount(): void {
    if(this.props.api)
    {
       this.fetch()
      .then((result: any) => {
        this.setState({
          isLoaded: false,
          items: result,
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

  renderBody = (data: any) => {
    return data.map((d: any) => {
      return <tr>{this.renderData(d)}</tr>;
    });
  };

  renderData = (data: any) =>
    this.props.tableStructure?.map((format: any) => {
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
    if(this.props.data ||  this.state.items.length !==0){ 
    let params = this.props;
    let data: [] = this.props.data || this.state.items[0];
    console.log(data);
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
        <TablePagination totalPages={()=>this.state.items[0]/this.state.limit} />
      </TabContainer>
    );
  }
}
}
