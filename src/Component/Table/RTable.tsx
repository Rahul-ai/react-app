import React from "react";
import { Table } from "react-bootstrap";

const data = [
  {
    color: "red",
    value: "#f00"
  },
  {
    color: "green",
    value: "#0f0"
  },
  {
    color: "blue",
    value: "#00f"
  },
  {
    color: "cyan",
    value: "#0ff"
  },
  {
    color: "magenta",
    value: "#f0f"
  },
  {
    color: "yellow",
    value: "#ff0"
  },
  {
    color: "black",
    value: "#000"
  }
];

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


  render() {
    let params = this.props;
    return <Table striped bordered hover>
      <thead><tr>{this.renderHeading(params.tableStructure)}</tr></thead>
      <tbody>{ this.renderBody(data) }
      </tbody>
    </Table>
  }
}