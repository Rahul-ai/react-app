import React from "react";
import { Table } from "react-bootstrap";

export class RTable extends React.Component<any>{

  renderHeading = (struct: any) => {
    return struct.map((head:any) => {
      return <th>{head.name}</th>
    });
  }

  renderBody = (data:any)=>{
    return data.map((d:any) => {
      return <tr>
      {this.renderData(d)}
      </tr>
    })
  }

  renderData = (data:any) => (
    this.props.tableStructure.map((format:any) => {
      if(format.render){
        return <td>{format.render(data)}</td>
      }
      return <td>{data[format.key]}</td>
    })
  )

  NrenderHeading = (data: any) => {
    return Object.keys(data[0]).map((key:any) => {
      return <th>{key}</th>
    });
  }

  NrenderBody = (data:any)=>{
    return data.map((d:any) => {
      return <tr>
      {this.NrenderData(d)}
      </tr>
    })
  }

  NrenderData = (data:any) => (
    Object.keys(data).map((key:any) => {
      return <td>{data[key]}</td>
    })
  )

  render() {
    let params = this.props;
    return <Table striped bordered hover>
      <thead><tr>
        {params?.tableStructure ? this.renderHeading(params.tableStructure) : this.NrenderHeading(params.data)}
      </tr>
      </thead>
      <tbody>
       { params?.tableStructure ? this.renderBody(params.data) : this.NrenderBody(params.data)}
      </tbody>
    </Table>
  }
}