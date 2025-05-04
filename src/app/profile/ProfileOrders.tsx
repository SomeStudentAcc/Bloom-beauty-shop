"use client";
import axiosInstance from "@/axios";
import { IActiveOrder, IGetData, IUser } from "@/types";
import { formatPrice } from "@/utils";
import React, { useEffect, useState } from "react";

interface OrderType {
  activeOrders: IActiveOrder[];
  orders: IActiveOrder[];
}

interface Props {
  getData: IGetData;
}

export default function ProfileOrders({ getData }: Props) {
  const [user, setUser] = useState<IUser>();
  const [selectedView, setSelectedView] = useState(1);

  const [allOrders, setAllOrders] = useState<OrderType>();
  useEffect(() => {
    const bUser = localStorage.getItem("b_user");
    if (bUser) {
      setUser(JSON.parse(bUser));
      console.log(JSON.parse(bUser));
    }
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosInstance.get("/get-orders", {
          params: {
            id: user?.id,
          },
        });
        /*  const {
          data,
        }: { data: { activeOrders: IActiveOrder[]; orders: IActiveOrder[] } } =
          res;
        const { activeOrders, orders } = data; */
        const orders: OrderType = res.data;
        setAllOrders(orders);
        console.log(orders);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <div className="flex-1 max-w-[940px] w-full">
      <h3 className="text-3xl mb-10">История заказов</h3>
      <div className="mb-5">
        <div className="flex gap-5  tetx-lg">
          <button
            onClick={() => setSelectedView(1)}
            className={`py-2 max-w-[10rem] w-full ${
              selectedView == 1 ? "border-[3px]" : "border-[#D1D1D1]"
            } border`}
          >
            Активные заказы
          </button>
          <button
            onClick={() => setSelectedView(2)}
            className={`py-2 max-w-[10rem] w-full ${
              selectedView == 2 ? "border-[3px]" : "border-[#D1D1D1]"
            } border`}
          >
            Все заказы
          </button>
        </div>
      </div>
      {selectedView == 1 ? (
        <div>
          <table className="w-full lg:block hidden text-left text-sm font-medium table-fixed">
            <thead className="text-gray-700">
              <tr className="border-y border-[#F3F3F3]">
                <th className="px-4 py-3 w-1/12">№</th>
                <th className="px-4 py-3 w-2/12">Дата</th>
                <th className="px-4 py-3 w-3/12">Способ оплаты</th>
                <th className="px-4 py-3 w-3/12">Статус</th>
                <th className="px-4 py-3 w-3/12">Сумма</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {allOrders?.activeOrders?.map((order) => (
                <tr key={order.id} className="border-b border-[#F3F3F3] w-full">
                  <td className="px-4 py-3 underline cursor-pointer">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">{order.created}</td>
                  <td className="px-4 py-3">{order.payment_type}</td>
                  <td className="px-4 py-3">
                    {getData.orderStatuses[order.status]}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <div className="text-nowrap">
                      {formatPrice(order.total)} сум
                    </div>
                    <a
                      href={order?.paymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 w-full border border-[#D1D1D1]"
                    >
                      Оплатить
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-5 pt-5 border-[#F3F3F3] border-t lg:hidden ">
            {allOrders?.activeOrders.map((order) => (
              <div
                key={order.id}
                className="border-[#F3F3F3] flex flex-col gap-5 border-b pb-5"
              >
                <div className="flex justify-between">
                  <p>№</p>
                  <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <p>Дата</p>
                  <span>{order.created}</span>
                </div>
                <div className="flex justify-between">
                  <p>Способ оплаты</p>
                  <span>{order.payment_type}</span>
                </div>
                <div className="flex justify-between">
                  <p>Статус</p>
                  <span> {getData.orderStatuses[order.status]}</span>
                </div>
                <div className="flex justify-between">
                  <p>Сумма</p>
                  <span>{formatPrice(order.total)} сум</span>
                </div>
                <div className="flex justify-end">
                  <a
                    href={order?.paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 max-w-[10rem] w-full border border-[#D1D1D1] flex justify-center cursor-pointer"
                  >
                    Оплатить
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <table className="w-full lg:block hidden text-left text-sm font-medium table-fixed">
            <thead className="text-gray-700">
              <tr className="border-y border-[#F3F3F3]">
                <th className="px-4 py-3 w-1/12">№</th>
                <th className="px-4 py-3 w-2/12">Дата</th>
                <th className="px-4 py-3 w-3/12">Способ оплаты</th>
                <th className="px-4 py-3 w-3/12">Статус</th>
                <th className="px-4 py-3 w-3/12">Сумма</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {allOrders?.orders?.map((order) => (
                <tr key={order.id} className="border-b border-[#F3F3F3] w-full">
                  <td className="px-4 py-3 underline cursor-pointer">
                    {order.id}
                  </td>
                  <td className="px-4 py-3">{order.created}</td>
                  <td className="px-4 py-3">{order.payment_type}</td>
                  <td className="px-4 py-3">
                    {getData.orderStatuses[order.status]}
                  </td>
                  <td className="px-4 py-3">{formatPrice(order.total)} сум</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-5 pt-5 border-[#F3F3F3] border-t lg:hidden ">
            {allOrders?.orders.map((order) => (
              <div
                key={order.id}
                className="border-[#F3F3F3] flex flex-col gap-5 border-b pb-5"
              >
                <div className="flex justify-between">
                  <p>№</p>
                  <span>{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <p>Дата</p>
                  <span>{order.created}</span>
                </div>
                <div className="flex justify-between">
                  <p>Способ оплаты</p>
                  <span>{order.payment_type}</span>
                </div>
                <div className="flex justify-between">
                  <p>Статус</p>
                  <span> {getData.orderStatuses[order.status]}</span>
                </div>
                <div className="flex justify-between">
                  <p>Сумма</p>
                  <span>{formatPrice(order.total)} сум</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
