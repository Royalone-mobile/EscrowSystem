/**
 * Author: Moses Adekunle Esan for E&M Digital
 * Date: 6/29/2017
 * Project: React Native Redux Quotes App with CRUD operations
 */

'use strict';

export const SAVE_AUTH = 'SAVE_AUTH'
export const SAVE_CLIENT_DASHBOARD = 'SAVE_CLIENT_DASHBOARD'
export const SAVE_ALLUSERS = 'SAVE_ALLUSERS'

export const saveAuth = (uid) => ({type: SAVE_AUTH, token:uid})
export const save_clientdash = (jobs) => ({type: SAVE_CLIENT_DASHBOARD, briefs:jobs})
export const save_allusers = (users) => ({type:SAVE_ALLUSERS, users:users})
