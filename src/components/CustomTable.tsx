import {Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import React, { useCallback } from 'react';
import {FixedSizeList as List} from 'react-window';

interface TableProps{
    columns: string[];
    data: any[];
    loadMore: () => Promise<void>;
    hasMore: boolean;
}

export default function CustomTable({columns, data, loadMore, hasMore} : TableProps){
    const Row = useCallback(({index, style}:{index:number, style:React.CSSProperties}) => (
        <TableRow style={style}>
            {
                columns.map((column) => (
                    <TableCell key={`${index}-${column}`}>{data[index][column]}</TableCell>
                ))
            }
        </TableRow>
    ), [columns, data]);
    return(
        <Table>
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <List
                height={600}
                itemCount={data.length}
                itemSize={50}
                width="100%"  
            >
                {Row}
            </List>
        </TableBody>
        </Table>
    )
}