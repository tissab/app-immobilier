import React, {useMemo, useState, useEffect} from 'react';
import {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import '../table/reactTable.css';

const ReactTable = (
    { 
        columns, 
        IdColumn, 
        data , 
        id, 
        height,
        Title, 
        handleSelect,
        handleDblclick, 
        objSelect, 
        setRows
    }) => {

    useEffect(() => {
        let table = document.getElementById(id);
        if(table !== null){
            let selected = table.getElementsByClassName('table-danger');
            if (selected[0]) selected[0].removeAttribute('class');
            if(objSelect[IdColumn] !== undefined){
                if (document.getElementById(objSelect[IdColumn]) !== null )
                 document.getElementById(objSelect[IdColumn]).className = 'table-danger';
            };
            setRows(currentValue => rows);
        }
    })
    
    const tableSelected = (e,dataSelect,index) => {   
        handleSelect((PrevData)=>dataSelect);  
    }       

    const searchColumn = (e) => {
        let div =  e.target.nextElementSibling
        let firstElement = div.firstElementChild
        let input = firstElement.firstElementChild
            input.disabled = !input.disabled;
            if(input.disabled === false){
                input.focus()
            }
    }   
 
    const defaultColumn = useMemo(()=>{
        return{
            Filter: InputFilter,
            minWidth: 30, 
            width: 150, 
            maxWidth: 200
        }
    })
   
 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        rows,
        setGlobalFilter,
        prepareRow
    } = useTable({
        columns,
        data,
        defaultColumn,
        initialState: {
            // sortBy: [
            //     {
            //         id: sortColumn === undefined?IdColumn:sortColumn,
            //         desc: false
            //     }
            // ],
            pageIndex: 0,
            pageSize: 250,
            hiddenColumns: [IdColumn]
        }
    }, useFilters, useGlobalFilter, useSortBy, usePagination)

    const {pageIndex, pageSize, globalFilter} = state;

    return (
        <>
        <div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-12">
                        <h5 className="card-title">{Title}</h5>
                    </div>
                    <div className="col-12">
                        <GlobalFilter globalFilter={globalFilter} 
                                      setGlobalFilter={setGlobalFilter}
                         />
                    </div>
                </div>
            </div>
            <div className="tableFixHead filterable table-responsive text-nowrap" style={{height: height}}>
                {
                     data === undefined  ?
                     <div className="d-flex justify-content-center" style={{paddingTop: "100px"}}>
                        <div className="spinner-border p-2" role="status" style={{width:"70px",height:"70px", fontSize:"30px"}}>
                            <span className="sr-only">Loading...</span>
                        </div>
                     </div>
                 :   
                <table {...getTableProps()} className="table table-sm table-hover table-striped" id={id}>
                    <thead className="thead-light">
                        {
                            headerGroups.map(headerGroup => (
                                <tr className="filters"{...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column, index) => (
                                           
                                            <th scope="col" style={{width:column.width}} key={index} >
                                                    {
                                                        !column.disableSorted &&
                                                        (
                                                            column.isSorted ?
                                                            (
                                                                column.isSortedDesc
                                                                ?
                                                                <i style={{ float: "left" }} className="fas fa-sort-down"></i>
                                                                :
                                                                <i style={{ float: "left" }} className="fas fa-sort-up"></i>
                                                            )
                                                            :
                                                            <i style={{ float: "left" }} className="fas fa-sort"></i>
                                                        )
                                                        
                                                        
                                                    }
                                                    { 
                                                        !column.disableFilters ?
                                                        <>
                                                            <i className="fas fa-search" onClick={ data.length === 0 ? ()=>{} : searchColumn} 
                                                                style={{ fontSize: "10px", float:"right", position: "relative" }}></i>
                                                            <div className="row" >
                                                                <div className="col-12" {...column.getHeaderProps(data.length > 0 && (!column.disableSorted && column.getSortByToggleProps({title:undefined}) ) )}>
                                                                    {column.render('Filter')}
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <div className="row" >
                                                            <div className="col-12" {...column.getHeaderProps(data.length > 0 && (!column.disableSorted && column.getSortByToggleProps({title:undefined})))}>
                                                                     {column.render('Filter')}
                                                            </div>
                                                         </div>
                                                        
                                                    }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map((row,index) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} onClick={(e)=>tableSelected(e, row.original,(index + pageIndex * pageSize))}
                                     onDoubleClick={()=>{handleDblclick()}}
                                     id={row.original[IdColumn]} >
                                        {
                                            row.cells.map((cell) => {
                                                return <td {...cell.getCellProps()} style={{textAlign: cell.column.position}}>{cell.render('Cell')}</td>
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                 }
            </div>
            <div className="card-footer bg-transparent border-100">
                <div className="level">
                    <div className="level-right">
                        <nav aria-label="page navigation example">
                            <ul className="pagination pagination-sm">                             
                                <select className="custom-select-sm" value={pageSize} onChange={e=> setPageSize(Number(e.target.value))} style={{width:"auto"}}>
                                    {
                                        [250,500,1000].map(pageSize =>(
                                            <option key={pageSize} value={pageSize}>
                                                Afficher {pageSize}
                                            </option>
                                        ))
                                    }
                                </select>
                                <li className="page-item" style={{ paddingRight: "5px",paddingLeft:"5px" }}>
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>
                                        <i className="fas fa-step-backward"></i>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=> previousPage()} disabled={!canPreviousPage}>
                                        <i className="fas fa-backward"></i>
                                    </button>
                                </li>
                                <li className="page-item" style={{paddingLeft:"5px", paddingRight:"5px", width: "80px"}}>
                                   <span style={{fontSize:"12px", color:"gray"}}>
                                        <input type="number" max={pageOptions.length} min="1" className="form-control form-control-sm dx-border-radius-inherit"
                                        style={{height:"30px"}}
                                         value={pageIndex+1} onChange={e => {
                                             const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0 
                                             gotoPage(pageNumber)
                                         }}/>
                                   </span>
                                </li>
                                <li className="page-item" style={{ paddingRight: "5px" }}>
                                    <span className="page-link page-count d-one d-sm-block"> sur {pageOptions.length}</span>
                                </li>
                                <li className="page-item" style={{ paddingRight: "5px" }}>
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=> nextPage()} disabled={!canNextPage}>
                                        <i className="fas fa-forward"></i>
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="btn btn-outline-primary btn-sm" onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>
                                        <i className="fas fa-step-forward"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
    
}

const InputFilter = ({column}) => {

    const {filterValue, setFilter} = column

    const disableInput = (e) => {
    //     if(e.target.disabled === false){
    //        e.target.disabled = true;
    //    }
    }
 
    return (
        <>
      
            
            <input type="text" className="form-control-sm text-center" style={{ width: "100%", fontWeight: "700", textTransform: "none" }}
                value={filterValue || ''} onChange={(e)=> setFilter(e.target.value)} 
                placeholder={column.render('Header')} autoFocus disabled  onBlur={disableInput} />
      

        </>
    )
}

export default ReactTable