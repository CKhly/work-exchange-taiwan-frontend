import { useState, useEffect } from 'react'
import { Stack, Container, Divider, Text, Wrap, Tabs, TabList, Tab } from "@chakra-ui/react"
import HostCard from '../components/HostCard'

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:4000/api/1.0/hosts/all');
  const json = await res.json();
  return {
    props: { hosts: json.data }
  }
}


export default function Search({ hosts }) {
  const [data, setData] = useState(hosts)
  const [location, setLocation] = useState("All") 
  const [category, setCategory] = useState(0) 
  const [gender, setGender] = useState(0) 
  const [short, setShort] = useState(0) 
  useEffect(() => {
    let filterData = hosts;
    if(location!=="All"){
      filterData = filterData.filter(d=>d.host_location==location);
    }
    if(category!==0){
      filterData = filterData.filter(d=>d.host_category==category);
    }
    if(gender!==0){
      filterData = filterData.filter(d=>d.host_gender_needs==gender);
    }
    if(short!==0){
      filterData = filterData.filter(d=>d.short_period==short);
    }
    setData(filterData)
  }, [location, category, gender, short])
  return (
    <Container maxW='1030px'>
      <Stack>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Text p={2} fontWeight={'bold'}>地區：</Text>
            <Tab  onClick={()=>{
              setLocation("All");
            }}>全部  </Tab>
            <Tab onClick={()=>{
              setLocation("Taiwan");
            }}>台灣本島  </Tab>
            <Tab onClick={()=>{
              setLocation("GreenIsland");
            }}>綠島  </Tab>
            <Tab onClick={()=>{
              setLocation("LanYu");
            }}>蘭嶼  </Tab>
            <Tab onClick={()=>{
              setLocation("XiaoLiuQiu");
            }}>小琉球  </Tab>
            <Tab onClick={()=>{
              setLocation("KinMen");
            }}>金門  </Tab>
            <Tab onClick={()=>{
              setLocation("MatSu");
            }}>馬祖  </Tab>
            <Tab onClick={()=>{
              setLocation("Others");
            }}>其他  </Tab>
          </TabList>  
        </Tabs>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Text p={2} fontWeight={'bold'}>類型：</Text>
            <Tab onClick={()=>{
              setCategory(0);
            }}>全部  </Tab>
            <Tab onClick={()=>{
              setCategory(1);
            }}>民宿  </Tab>
            <Tab onClick={()=>{
              setCategory(2);
            }}>餐廳  </Tab>
            <Tab onClick={()=>{
              setCategory(3);
            }}>商店  </Tab>
            <Tab onClick={()=>{
              setCategory(4);
            }}>潛店  </Tab>
            <Tab onClick={()=>{
              setCategory(5);
            }}>衝浪店  </Tab>
            <Tab onClick={()=>{
              setCategory(6);
            }}>其他  </Tab>
          </TabList>
        </Tabs>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Text p={2} fontWeight={'bold'}>性別限制：</Text>
            <Tab onClick={()=>{
              setGender(0);
            }}>全部  </Tab>
            <Tab onClick={()=>{
              setGender(1);
            }}>限男  </Tab>
            <Tab onClick={()=>{
              setGender(2);
            }}>限女  </Tab>
            <Tab onClick={()=>{
              setGender(3);
            }}>不限  </Tab>
            </TabList>
        </Tabs>
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Text p={2} fontWeight={'bold'}>可否接受短期：</Text>
            <Tab onClick={()=>{
              setShort(0);
            }}>全部  </Tab>
            <Tab onClick={()=>{
              setShort(1);
            }}>接受短期</Tab>
          </TabList>
        </Tabs>
        <Divider />
      </Stack>
      <Stack>
        <Text fontSize='xl' mt='10px'>篩選結果：</Text>
        <Text>總共有 {data.length} 筆篩選節果</Text>
        <Wrap>
          {data.map(host => (
            <HostCard host={host} key={host.host_id}/>    
          ))}
        </Wrap>
      </Stack>
    </Container> 
  )
}