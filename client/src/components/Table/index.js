import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


const Table = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit(); 
    }
 
      let defaultColDef = {
        resizable: true,
        sortable: true,
        wrapText: true,
        autoHeight: true
      }


    let rowData = []
    props.results.map((ele, i) => rowData.push( 
      { address: ele.address, 
      daysOnZillow: ele.daysOnZillow, 
      price:  ele.price,
      livingArea: ele.livingArea }
      ))


    let columnDefs = [
         {
        field: 'address',
        headerName: 'address',
        cellRenderer: function(params) {
          return params.data.address;
        },
        flex: 2,
      },
      {
        field: 'daysOnZillow',
        headerName: 'daysOnZillow',
        cellRenderer: function(params) {
          return params.data.daysOnZillow;
        },
        flex: 1,
      },
      {
        field: 'price',
        headerName: 'price',
        cellRenderer: function(params) {
          return formatter.format(params.data.price).replace(/(\.|,)00$/g, '');
        },
        flex: 1,
      },{
        field: 'livingArea',
        headerName: 'livingArea',
        cellRenderer: function(params) {
          return params.data.livingArea;
        },
        flex: 1,
      }]

    return (
        <div className="ag-theme-alpine" style={ { height: 500, width: "100%" } }>
            <AgGridReact
                onGridReady={onGridReady}
                rowData={rowData}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                > 
                <AgGridColumn field="address"></AgGridColumn>
                <AgGridColumn field="daysOnZillow" sortable={true}></AgGridColumn>
                <AgGridColumn field="price" sortable={true}></AgGridColumn>
                <AgGridColumn field="livingArea" sortable={true}></AgGridColumn>
            </AgGridReact>
        </div>
    );
};

export default Table;
