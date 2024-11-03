"use client";

import { useEffect, useState } from "react";
import * as DataApi from "./api/data";
import DataItem from "./components/dataItem";
import Notification from "./components/notification"; // Ensure this import is correct
import Data from "./models/data";

export default () => {
  const [dataList, setDataList] = useState<Data[] | null>(null);
  const [createKey, setCreateKey] = useState(0); // Key to reset the create form
  const [notification, setNotification] = useState(""); // Track notification message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas: Data[] = await DataApi.getAll();
        setDataList(datas);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (request: DataApi.PostData) => {
    try {
      const newData = await DataApi.create(request);
      const newDatas = [newData, ...(dataList || [])];
      setDataList(newDatas);

      // Reset the create form by updating createKey
      setCreateKey((prevKey) => prevKey + 1);

      setNotification("Item created successfully!");
    } catch (error) {
      console.error("Failed to create data", error);
    }
  };

  const onUpdate = async (id: string, request: DataApi.PatchData) => {
    try {
      const newData = await DataApi.update(id, request);
      setDataList((prevDataList) => {
        if (!prevDataList) {
          // Shouldn't be possible when updating
          return prevDataList;
        }
        return prevDataList.map((item) =>
          item.id === newData.id ? { ...item, ...newData } : item
        );
      });
      setNotification("Item updated successfully!");
    } catch (error) {
      console.error("Failed to update data", error);
    }
  }

  const onDelete = async (id: string) => {
    try {
      const response = await DataApi.remove(id);

      if (response.ok) {
        setDataList((prevDataList) => {
          if (!prevDataList) {
            // Shouldn't be possible when deleting
            return prevDataList;
          }
          return prevDataList.filter((item) => item.id !== id);
        });
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Failed to delete data", error);
    }
  };

  return (
    <main className="main">
      <h1>Data Editor</h1>
      <div className="container">
        <h2>Create Data</h2>
        <DataItem key={createKey} create={true} onCreate={handleCreate} />
      </div>
      <div className="container">
        <h2>Edit Data</h2>
        <div>
          <ul className='data-list'>
            {dataList == null && <p>Loading...</p>}
            {dataList != null && dataList.length === 0 && <p>No data items</p>}
            {dataList != null && dataList.length > 0 && dataList.map((data) => (
              <li key={data.id}>
                <div className='container'>
                  <DataItem data={data} onDelete={onDelete} onUpdate={onUpdate} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {notification && <Notification key={notification} message={notification} onClose={() => setNotification("")} />}
    </main>
  )
}
