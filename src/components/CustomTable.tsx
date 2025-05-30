import {Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper} from '@mui/material';
import React, { useCallback } from 'react';
import {FixedSizeList as List} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface TableProps{
    columns: string[];
    data: any[];
    loadMore: () => Promise<void>;
    hasMore: boolean;
}

export default function CustomTable({columns, data, loadMore, hasMore} : TableProps){
    const isItemLoaded = (index: number) => !hasMore || index < data.length;
    const Row = useCallback(({index, style}:{index:number, style:React.CSSProperties}) => {
        if (!isItemLoaded(index)){
            return(
                <TableRow style={style}>
                    <TableCell colSpan={columns.length} align='center'>
                        ...Loading
                    </TableCell>
                </TableRow>
            )
        }
        return(
            <TableRow style={style}>
                {
                    columns.map((column) => (
                        <TableCell key={`${index}-${column}`}>
                            {data[index][column]}
                        </TableCell>
                    ))
                }
            </TableRow>
        )
        
    }, [columns, data, hasMore]);
    return(
        <TableContainer component={Paper} sx={{maxHeight:600}}>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column} sx={{fontWeight: 'bold'}}>
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={hasMore?data.length+1:data.length}
                        loadMoreItems={loadMore}
                        threshold={5}
                    >
                        {({onItemsRendered, ref}) =>(
                            <List
                                height={500}
                                itemCount={hasMore?data.length+1:data.length}
                                itemSize={50}
                                width="100%"
                                onItemsRendered={onItemsRendered}
                                ref={ref}  
                            >
                                {Row}
                            </List>
                        )}
                        
                    </InfiniteLoader>
                </TableBody>
            </Table>
        </TableContainer>
    )
}