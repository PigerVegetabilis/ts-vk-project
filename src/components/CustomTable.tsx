import {Box, Paper, Typography, Tooltip} from '@mui/material';
import React, { useCallback, useRef, useEffect } from 'react';
import {FixedSizeList as List} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {observer} from 'mobx-react-lite'

interface TableProps{
    columns: string[];
    data: any[];
    loadMore: () => Promise<void>;
    hasMore: boolean;
    isLoading: boolean;
}

const CustomTable = observer(({columns, data, loadMore, hasMore, isLoading} : TableProps) => {
    const listRef = useRef<any>(null);
    const loadingRef = useRef(false);
    useEffect(() => {
        loadingRef.current = isLoading;
    }, [isLoading]);
    const isItemLoaded = (index: number) => !hasMore || index < data.length;
    const Row = useCallback(({index, style}:{index:number, style:React.CSSProperties}) => {
        if (!isItemLoaded(index)){
            return(
                <Box style={style} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant='body2'>
                        ...Loading
                    </Typography>
                </Box>
            )
        }
        return(
            <Box style={style} display="flex" borderBottom="1px solid #eee">
                {
                    columns.map((column) => (
                        <Box key={`${index}-${column}`}
                            flex={1}
                            padding={1}
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Tooltip title={data[index][column]} placement="top">
                                <Box sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>{data[index][column]}</Box>
                            </Tooltip>
                        </Box>
                    ))
                }
            </Box>
        )
        
    }, [columns, data, hasMore]);

    const loadMoreItems = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;
        try {
            loadingRef.current = true;
            await loadMore();
        } finally {
            loadingRef.current = false;
        }
    }, [loadMore, hasMore]);

    return(
        <Paper sx={{ maxHeight: 600, overflow: 'auto' }}>
            <Box 
                display="flex" 
                bgcolor="#f5f5f5" 
                fontWeight="bold" 
                borderBottom="2px solid #ccc"
                position="sticky"
                top={0}
                zIndex={1}
            >
                {columns.map((column) => (
                    <Box 
                        key={column} 
                        flex={1} 
                        padding={1}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {column}
                    </Box>
                ))}
            </Box>

            
            <Box sx={{ height: 'calc(100% - 40px)' }}>
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={hasMore?data.length+1:data.length}
                    loadMoreItems={loadMoreItems}
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
            </Box>
            
        </Paper>
        
    )
});

export default CustomTable;