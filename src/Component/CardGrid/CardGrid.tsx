import {
  Button,
  Card,
  CardImg,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { TablePagination } from "../Table/TablePagination";
import { useEffect, useState } from "react";
import { Api } from "../../Helpers/axios/axios";
import { ExportToCsv } from "export-to-csv";
import { Link } from "react-router-dom";

export const CardGrid = (props: any) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [pageSize, setPageSize] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let variant = [
    "Primary",
    "Secondary",
    "Success",
    "Danger",
    "Warning",
    "Info",
    "Dark",
  ];

  const fetch = () => {
    Api.post(props.api, { page: currentPage, limit: limit })
      .then((res: any) => {
        if (res[0] && res[1]) {
          setData(res[0]);
          setCount(res[1]);
          setPageSize(Math.ceil(res[1] / limit));
        } else {
          setData(res);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {});
  };

  const SrNo = (index: number) => {
    return (currentPage - 1) * limit + index;
  };

  useEffect(() => {
    fetch();
  }, [currentPage, limit]);

  const onClick = (event: any) => {
    if (event.target.text && event.target.text != "") {
      setCurrentPage(parseInt(event.target.text));
    }
  };

  const onClickNext = (event: any) => {
    setCurrentPage(currentPage + 1);
  };

  const onClickPrevious = (event: any) => {
    setCurrentPage(currentPage - 1);
  };

  const totalPage = () => {
    if (count != -1) {
      setPageSize(Math.ceil(count / 10));
    }
  };

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min);
  };

  const ErenderHeading = (data: any, action: boolean = true) => {
    let a = Object.keys(data[0]).map((key: any) => {
      return key;
    });
    return a;
  };

  const ErenderBody = (data: any) => {
    let a = data.map((d: any) => {
      return ErenderData(d);
    });
    return a;
  };

  const ErenderData = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      if (typeof data[key] === "object") {
        return JSON.stringify(data[key]);
      }
      return data[key];
    });
    return a;
  };

  const onSelectClick = (event: any) => {
    setLimit(event.target.value);
    setCurrentPage(1);
  };

  const exportbutton = () => {
    let columns = props?.ExportStructure ? [] : ErenderHeading(data, false);

    var today = new Date();
    var date =
      today.getFullYear() +
      "_" +
      (today.getMonth() + 1) +
      "_" +
      today.getDate();
    var time =
      today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
    var dateTime = date + " " + time;
    let filename = `export_${dateTime}.csv`;

    var rows: any = ErenderBody(data);

    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
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
  };

  const cardLoad = () => {
    let a = data.map((d: any, index: any) => {
      return (
        <Col>
          <Card
            border={variant[getRandomArbitrary(0, 5)].toLowerCase()}
            key={variant[getRandomArbitrary(0, 5)]}
          >
            <Card.Header>Entre No. {SrNo(index + 1)}</Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                {cardStructure(d)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      );
    });
    return a;
  };

  const cardStructure = (data: any) => {
    let a = Object.keys(data).map((key: any) => {
      return (
        <ListGroupItem>
          {key} : {data[key]}
        </ListGroupItem>
      );
    });
    return a;
  };

  return (
    <div className="container" style={{ marginTop: 10 }}>
      <div className="Buttons">
        <div className="bg-success p-2 text-dark bg-opacity-25 record">
            Total Records: {count}
        </div>

        {props.Addlink && (
              <Link
                to={props.Addlink}
                type="button"
                className="btn btn-outline-primary Export"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                  focusable="false"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                </svg>
                Add New
              </Link>
            )}

        <button
              type="button"
              className="btn btn-outline-success Export"
              onClick={() => {
                exportbutton()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="#007745"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 15c.7-1.2 1-2.5.7-3.9-.6-2-2.4-3.5-4.4-3.5h-1.2c-.7-3-3.2-5.2-6.2-5.6-3-.3-5.9 1.3-7.3 4-1.2 2.5-1 6.5.5 8.8m8.7-1.6V21" />
                <path d="M16 16l-4-4-4 4" />
              </svg>
              Export
            </button>

      </div>

      <Row xs={1} md={2} className="g-4 mb-3">
        {cardLoad()}
      </Row>

      <TablePagination
        key={"TablePagination"}
        onSelectClick={onSelectClick}
        onClick={onClick}
        totalPages={pageSize}
        page={currentPage}
        TotalRecord={count}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      />
    </div>
  );
};
