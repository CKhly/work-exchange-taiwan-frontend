import { useState, useEffect } from 'react'
import { Stack, Divider, Container, Flex,  Text, HStack, Checkbox, Tabs, TabList, Tab } from "@chakra-ui/react"

export default function MultiFilter({ hosts, setDisplay }) {
  const [category, setCategory] = useState([true, true, true, true, true, true, true]) 
  const [gender, setGender] = useState([true, true, true]) 
  const [short, setShort] = useState([true, true]) 

  const categoryAllChecked = category.every(Boolean)
  const categoryIsIndeterminate = category.some(Boolean) && !categoryAllChecked
  const genderAllChecked = gender.every(Boolean)
  const genderIsIndeterminate = gender.some(Boolean) && !genderAllChecked
  const shortAllChecked = short.every(Boolean)
  const shortIsIndeterminate = short.some(Boolean) && !shortAllChecked

  useEffect(() => {
    let filterData = hosts;

    filterData = filterData.filter(d=> category.reduce((out, bool, index) => bool ? out.concat(index+1) : out, []).includes(d.host_category));
    filterData = filterData.filter(d=> gender.reduce((out, bool, index) => bool ? out.concat(index+1) : out, []).includes(d.host_gender_needs));
    filterData = filterData.filter(d=> short.reduce((out, bool, index) => bool ? out.concat(index) : out, []).includes(d.short_period));
    setDisplay(filterData)
  }, [category, gender, short])
  return (
    <Container maxW='1080px' >
      <Text fontSize='xl' mt='10px' fontWeight={'bold'}>請選擇你有興趣的換宿條件：</Text>
      <Flex mt={"20px"}>
        
        <Container>
          <Stack pl={2} mt={1} spacing={2}>
            <Text>營業類型：</Text>
            <Checkbox
              isChecked={categoryAllChecked}
              isIndeterminate={categoryIsIndeterminate}
              onChange={(e) => setCategory([e.target.checked, e.target.checked, e.target.checked, e.target.checked, e.target.checked, e.target.checked])}
            >
              全部
            </Checkbox>
            <Divider />
            <Checkbox
              isChecked={category[0]}
              onChange={(e) => setCategory([e.target.checked, category[1], category[2], category[3], category[4], category[5]])}
            >
              民宿
            </Checkbox>
            <Checkbox
              isChecked={category[1]}
              onChange={(e) => setCategory([category[0], e.target.checked, category[2], category[3], category[4], category[5]])}
            >
              餐廳
            </Checkbox>
            <Checkbox
              isChecked={category[2]}
              onChange={(e) => setCategory([category[0], category[1], e.target.checked, category[3], category[4], category[5]])}
            >
              商店
            </Checkbox>
            <Checkbox
              isChecked={category[3]}
              onChange={(e) => setCategory([category[0], category[1], category[2], e.target.checked, category[4], category[5]])}
            >
              潛店
            </Checkbox>
            <Checkbox
              isChecked={category[4]}
              onChange={(e) => setCategory([category[0], category[1], category[2], category[3], e.target.checked, category[5]])}
            >
              衝浪店
            </Checkbox>
            <Checkbox
              isChecked={category[5]}
              onChange={(e) => setCategory([category[0], category[1], category[2], category[3], category[4],  e.target.checked])}
            >
              其他
            </Checkbox>
          </Stack>
        </Container>
        <Container maxW='280px'>
          <Stack pl={2} mt={1} spacing={2} > 
            <Text>性別限制：</Text>
            <Checkbox
              isChecked={genderAllChecked}
              isIndeterminate={genderIsIndeterminate}
              onChange={(e) => setGender([e.target.checked, e.target.checked, e.target.checked])}
            >
              全部
            </Checkbox>
            <Divider />
            <Checkbox
              isChecked={gender[0]}
              onChange={(e) => setGender([e.target.checked, gender[1], gender[2]])}
            >
              限男
            </Checkbox>
            <Checkbox
              isChecked={gender[1]}
              onChange={(e) => setGender([gender[0], e.target.checked, gender[2]])}
            >
              限女
            </Checkbox>
            <Checkbox
              isChecked={gender[2]}
              onChange={(e) => setGender([gender[0], gender[1], e.target.checked])}
            >
              不限
            </Checkbox>
          </Stack>
        </Container>
        <Container maxW='280px'>
          <Stack pl={2} mt={1} spacing={2}>
            <Text>接受短期：</Text>
            <Checkbox
              isChecked={shortAllChecked}
              isIndeterminate={shortIsIndeterminate}
              onChange={(e) => setShort([e.target.checked, e.target.checked])}
            >
              全部
            </Checkbox>
            <Divider />
            <Checkbox
              isChecked={short[0]}
              onChange={(e) => setShort([e.target.checked, short[1]])}
            >
              接受短期
            </Checkbox>
            <Checkbox
              isChecked={short[1]}
              onChange={(e) => setShort([short[0], e.target.checked])}
            >
              不接受
            </Checkbox>
          </Stack>
        </Container>
      </Flex>
    </Container> 
  )
}