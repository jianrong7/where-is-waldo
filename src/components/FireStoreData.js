import React from 'react';
import { useGetData } from '../hooks/useGetData';
import Update from './Update';
import Delete from './Delete';

const FireStoreData = () => {
    const [documents] = useGetData();

    return (
        <div>
            <span>Values</span>
            {documents.map(document => {
                return(
                    <div key={document.id}>
                        <div>
                            Document: {document.id} Value: {document.value.value}
                        </div>
                        <Delete doc={document.id} />
                        <Update doc={document.id} />
                    </div>  
                );
            })}

        </div>
    );
};

export default FireStoreData;