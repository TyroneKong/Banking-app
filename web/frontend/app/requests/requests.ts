'use client';

import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import Expense from '../types/expenses';
import Transaction from '../types/transaction';

export const axiosRequest = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

type NewTransactionType = Pick<Transaction, 'name' | 'amount' | 'type'>;

export const getAllExpenses = async (signal?: AbortSignal) => {
  const response = await axiosRequest.get('/api/allExpenses', { signal });
  return response;
};

export const useGetExpenses = (): UseQueryResult<AxiosResponse<Expense[]>> =>
  useQuery({
    queryKey: ['expenses'],
    queryFn: ({ signal }) => getAllExpenses(signal),
  });

export const getAllTransactions = async (signal?: AbortSignal) => {
  const response = await axiosRequest.get('/api/allTransactions', { signal });
  return response;
};

export const useGetTransactions = (): UseQueryResult<
  AxiosResponse<Transaction[]>
> =>
  useQuery({
    queryKey: ['transactions'],
    queryFn: ({ signal }) => getAllTransactions(signal),
  });

export const createTransaction = (body) => {
  return axiosRequest.post('/api/createTransaction', body);
};

export const createExpenses = (body): Promise<AxiosResponse<any, any>> => {
  return axiosRequest.post(`/api/CreateExpense`, body);
};
