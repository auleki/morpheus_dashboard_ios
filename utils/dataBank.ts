import {DASH_CHART_SECTIONS} from "@/utils/Links";

export const DASHBOARD_TABS = [
    {
        title: 'Supply',
        locked: false,
        pathname: DASH_CHART_SECTIONS.SUPPLY,
        id: 1,
    },
    {
        title: 'Staking',
        locked: true,
        pathname: DASH_CHART_SECTIONS.STAKING,
        id: 2,
    },
    {
        title: 'Capital',
        locked: true,
        pathname: DASH_CHART_SECTIONS.CAPITAL,
        id: 3,
    },
    {
        title: 'Code',
        locked: true,
        pathname: DASH_CHART_SECTIONS.CODE,
        id: 4,
    }
]

export const LIQUIDITY_STATS = [
    {
        title: 'Protocol-Owned Liquidity Value USD',
        key: 'total_value_usd',
        value: null,
        tabTitle: 'PoL Value USD'
    },
    {
        title: 'Protocol-Owned Liquidity Amount MOR',
        value: null,
        key: 'mor_value',
        tabTitle: 'MOR PoL'
    },
    {
        title: 'Protocol-Owned Liquidity Amount stETH',
        value: null,
        key: 'steth_value',
        tabTitle: 'wETH PoL'
    },
]


export const API_PIE_DATA = {
    "total": {
        "0-10": 2884,
        "10-25": 558,
        "25-50": 262,
        "50-100": 223,
        "100-200": 189,
        "200-500": 162,
        "500-1000": 79,
        "1000-10000": 126,
        "10000-500000": 29
    },
    "Arbitrum": {
        "0-10": 2734,
        "10-25": 531,
        "25-50": 256,
        "50-100": 214,
        "100-200": 184,
        "200-500": 158,
        "500-1000": 77,
        "1000-10000": 121,
        "10000-500000": 29
    },
    "Base": {
        "0-10": 136,
        "10-25": 25,
        "25-50": 6,
        "50-100": 8,
        "100-200": 4,
        "200-500": 4,
        "500-1000": 2,
        "1000-10000": 4,
        "10000-500000": 0
    },
    "Ethereum": {
        "0-10": 14,
        "10-25": 2,
        "25-50": 0,
        "50-100": 1,
        "100-200": 1,
        "200-500": 0,
        "500-1000": 0,
        "1000-10000": 1,
        "10000-500000": 0
    }
}