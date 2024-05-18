import orderCoverImg from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from '../../../hooks/useMenu';
import OrderTabPanel from '../OrderTabPanel/OrderTabPanel';
import { useParams } from 'react-router';
import { useState } from 'react';
import DynamicTitle from '../../Shared/DynamicTitle/DynamicTitle';


const Order = () => {
    const categories = ['salad','pizza','soup','dessert','drinks'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex,setIndex]=useState(initialIndex)

    const [menu] = useMenu();

    const salad = menu?.filter((item) => item.category === "salad");
    const pizza = menu?.filter((item) => item.category === "pizza");
    const soup = menu?.filter((item) => item.category === "soup");
     const desserts = menu?.filter((item) => item.category === "dessert");
     const drinks = menu?.filter((item) => item.category === "drinks");

  return (
    <div className="mb-5">
      <DynamicTitle title="Order" />
      <Cover img={orderCoverImg} title="Order Food" />

      <div>
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setIndex(index)}>
          <TabList>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soup</Tab>
            <Tab>Dessert</Tab>
            <Tab>Drinks</Tab>
          </TabList>

          <TabPanel>
            <OrderTabPanel items={salad} />
          </TabPanel>

          <TabPanel>
            <OrderTabPanel items={pizza} />
          </TabPanel>

          <TabPanel>
            <OrderTabPanel items={soup} />
          </TabPanel>

          <TabPanel>
            <OrderTabPanel items={desserts} />
          </TabPanel>

          <TabPanel>
            <OrderTabPanel items={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default Order