export type PieDataType = {
    value: number;
    color: string;
    keyValue: string;
    id: number;
}

export type BurnedLockedTabsType = {
    id: number,
    title: string,
    accessor: string,
}

export type PieDataTabsListProps = {
    pieDataTabs: any[],
    onTabChange: (tab: any) => void,
    activePieDataTab: {}
}

export type SecondaryTabSwitchProps = {
    tabs: any[],
    onTabChange: (tab: any) => void,
    activeTab: {}
}

export type DataTabType = {
    id: number;
    title: string
}

export type TabDataType = {
    tabTitle: string;
    id: number;
    accessor?: string;
    value?: string | number
    deepaccessor?: string
}
