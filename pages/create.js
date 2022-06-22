import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Input, Heading, Text, Textarea, FormHelperText, RadioGroup, HStack, Stack, Radio, Select, FormControl, FormLabel } from '@chakra-ui/react'

export default function Create() {
    const { register, handleSubmit } = useForm();
    const [hostId, setHostId] = useState(""); 
    const [name, setName] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [contacts, setContacts] = useState(""); 
    const [address, setAddress] = useState(""); 
    const [needs, setNeeds] = useState(""); 
    const [benefits, setBenefits] = useState(""); 
    const [others, setOthers] = useState(""); 

    const onSubmit = async (data) => {
        console.log("HI")
        const formData = new FormData();
        formData.append("host_id", data.hostId);
        formData.append("host_name", data.name);
        formData.append("contacts", data.contacts);
        formData.append("category", data.category);
        formData.append("location", data.location);
        formData.append("address", data.address);
        formData.append("gender", data.gender);
        formData.append("short_period", data.short_period);
        formData.append("description", data.description);
        formData.append("needs", data.needs);
        formData.append("benefits", data.benefits);
        formData.append("others", data.others);
        formData.append("start_date", data.startDate);
        formData.append("end_date", data.endDate);
        formData.append("vacants", data.vacants);
        formData.append("main_image", data.main_image[0]);
        formData.append("other_images", data.first_image[0]);
        formData.append("other_images", data.second_image[0]);
        console.log("formData: ",formData)
        const res = await fetch('http://localhost:4000/api/1.0/admin/host',
            {
                body: formData,
                method: 'POST',
            })
        console.log("res", res);
      };
    return (
        <Container maxW='960px' mb={20}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading as='h3' size='lg' mb={5}>提供換宿機會，幫助社群變得更好！</Heading>
                    <FormLabel htmlFor='hostId' >ID</FormLabel>
                    <Input id='hostId' type='number' {...register("hostId", { required: true })}  value={hostId} onChange={(e) => setHostId(e.target.value)}/>
                    <FormLabel htmlFor='name' >單位名稱</FormLabel>
                    <Input id='name' type='text' {...register("name", { required: true })}  value={name} onChange={(e) => setName(e.target.value)} />
                    <FormLabel htmlFor='description'>單位簡介:</FormLabel>
                    <Textarea
                        id='description' type='text' {...register("description", { required: true })}  value={description} onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormControl>
                        <FormLabel htmlFor='contacts' >聯絡方式</FormLabel>
                        <Input id='contacts' type='text' {...register("contacts", { required: true })}  value={contacts} onChange={(e) => setContacts(e.target.value)}/>
                        <FormHelperText>請輸入電子郵件、行動電話或其他通訊軟體通訊方式</FormHelperText>
                    </FormControl>           
                    <Text mb='8px'>地址</Text>
                    <Input id='address' type='text' {...register("address", { required: true })}  value={address} onChange={(e) => setAddress(e.target.value)}/>
                    <Text mb='8px'>地區:</Text>
                    <RadioGroup name="location" mb='8px'>
                        <HStack spacing='24px'>
                            <Radio type="radio" {...register("location")} name="location"value='Taiwan'>台灣本島</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='GreenIsland'>綠島</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='LanYu'>蘭嶼</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='XiaoLiuQiu'>小琉球</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='KinMen'>金門</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='MatSu'>馬祖</Radio>
                            <Radio type="radio" {...register("location")} name="location" value='Others'>其他</Radio>
                        </HStack>
                    </RadioGroup>
                    <Text mb='8px'>類型:</Text> 
                    <RadioGroup name="category" mb='8px'>
                        <HStack spacing='24px'>   
                            <Radio type="radio" {...register("category")} value='hotel'>民宿/青旅</Radio>
                            <Radio type="radio" {...register("category")} value='restaurant'>餐廳</Radio>
                            <Radio type="radio" {...register("category")} value='store'>商店</Radio>
                            <Radio type="radio" {...register("category")} value='surfing'>潛店</Radio>
                            <Radio type="radio" {...register("category")} value='diving'>衝浪店</Radio>
                            <Radio type="radio" {...register("category")} value='others'>其他</Radio>
                        </HStack>
                    </RadioGroup>
                    <Text mb='8px'>性別限制:</Text>
                    <RadioGroup name="gender" mb='8px'>
                        <HStack spacing='24px'>
                            <Radio type="radio" {...register("gender")} value='female'>限女</Radio>
                            <Radio type="radio" {...register("gender")} value='male'>限男</Radio>
                            <Radio type="radio" {...register("gender")} value='both'>不限</Radio>
                        </HStack>
                    </RadioGroup>
                    <Text mb='8px'>換宿工作內容:</Text>
                    <Textarea
                        id='needs' name="needs" type='text' {...register("needs")}  value={needs} onChange={(e) => setNeeds(e.target.value)}
                    />
                    <Text mb='8px'>換宿福利:</Text>
                    <Textarea
                        id='benefits' name="benefits" type='text' {...register("benefits")}  value={benefits} onChange={(e) => setBenefits(e.target.value)}
                    />
                    <Text mb='8px'>其他注意事項:</Text>
                    <Textarea
                        id='others' name="others" type='text' {...register("others")}  value={others} onChange={(e) => setOthers(e.target.value)}
                    />
                    <Text mb='8px'>可否接受短期:</Text>
                    <RadioGroup name="short_period" mb='8px'>
                        <HStack spacing='24px'>
                            <Radio type="radio" {...register("short_period")} value='accept'>接受短期</Radio>
                            <Radio type="radio" {...register("short_period")} value='reject'>不接受短期</Radio>
                        </HStack>
                    </RadioGroup>
                        <FormLabel htmlFor='start_date'>換宿開始日期:</FormLabel>
                        <Input id='start_date' type='date' {...register("startDate")}  mb='8px'/>
                        <FormLabel htmlFor='end_date'>換宿結束日期</FormLabel>
                        <Input id='end_date' type='date' {...register("endDate")} mb='8px' />
                        <FormLabel htmlFor='vacants'>缺額</FormLabel>
                        <Input id='vacants' type='number' {...register("vacants")}  mb='8px'/> 
                    <Text mb='8px'>圖片:</Text>  
                    <HStack spacing='24px' mb={10}>
                        <FormLabel htmlFor='mainImage'>首圖:</FormLabel>
                        <Input type="file" name="main_image" id="mainImage"  {...register("main_image")} />
                        <FormLabel htmlFor='firstImage'>圖1:</FormLabel>
                        <Input type="file" name="other_images" id="firstImage"  {...register("first_image")} />
                        <FormLabel htmlFor='secondImage'>圖2:</FormLabel>
                        <Input type="file" name="other_images" id="secondImage"  {...register("second_image")} />
                    </HStack>
                <Input type="submit" value="發表"/>
            </form>
        </Container>
    )
}