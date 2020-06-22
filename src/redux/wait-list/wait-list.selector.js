import { createSelector } from 'reselect'

const selectWaitList = state => state.waitList

export const selectCustomers = createSelector(
    [selectWaitList],
    (waitList) => waitList.customers
)