import {useEffect, useState} from "react";
import {TabDataType} from "@/types/charts";

export default function useSimpleTab(data: TabDataType[]) {
    const [activeTab, setActiveTab] = useState<number | null>(null)
    const [tabs, setTabs] = useState<TabDataType[]>(data)
    const [currentTab, setCurrentTab] = useState<TabDataType | null>(null)

    useEffect(() => {
        const firstElId = data[0].id
        setCurrentTab(data[0])
        setActiveTab(firstElId)
    }, [])

    function switchActiveTab(id: number) {
        // console.log({tabToSwitch: id});
        const _currentTab = tabs.filter(tab => tab.id === id)[0]
        setCurrentTab(_currentTab)
        setActiveTab(id)
    }

    function updateTabs(tabs: TabDataType[], tabId: number) {
        setTabs(tabs)
        const _currentTab = tabs.filter(tab => tab.id === tabId)[0]
        setCurrentTab(_currentTab)
        // console.log({ activeTab, _currentTab, tabs, tabId })
        return currentTab
    }

    function addPropertyToTab(tab: TabDataType, property = "accessor", value: string) {
        return {
            ...tab,
            [property]: value
        }
    }


    return {
        activeTab,
        switchActiveTab,
        tabs,
        addPropertyToTab,
        updateTabs,
        currentTab
    }
}

