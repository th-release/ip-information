import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [ip, setIp] = useState<String>("");
  const [country, setCountry] = useState<String>("");
  const [countryCode, setCountryCode] = useState<String>("");
  const [region, setRegion] = useState<String>("");
  const [regionName, setRegionName] = useState("");
  const [city, setCity] = useState<String>("");
  const [zip, setZip] = useState<String>("");
  const [pos, setPos] = useState<number[]>([0, 0]);
  const [timezone, setTimezone] = useState<String>("");
  const [isp, setIsp] = useState<String>("");
  const [org, setOrg] = useState<String>("");
  const [as, setAs] = useState<String>("");
  const [tryip, setTryip] = useState<Number>(0);

  const submit = async (e: any) => {
    e.preventDefault()
    const res = await fetch("http://ip-api.com/json/" + ip, {
      method: "GET"
    }).then(res => res.json())

    if (res.status === "fail") {
      alert(res.message + "\n" + res.query);
      setTryip(0);
    } else {
      setCountry(res.country);
      setCountryCode(res.countryCode);
      setRegion(res.region);
      setRegionName(res.regionName);
      setCity(res.city);
      setZip(res.zip);
      setPos([res.lat, res.lon]);
      setTimezone(res.timezone);
      setIsp(res.isp);
      setOrg(res.org);
      setAs(res.as);
      setTryip(1);
      alert("아이피 정보 획득")
    }
  }

  return (
    <div style={{ marginLeft: "30px", marginTop: "10px" }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={submit} method="GET">
        <input type={"text"} placeholder='internet protocol' onChange={(e) => setIp(e.target.value)} />
        <input type={"submit"} value="정보 확인" />
      </form>

      {tryip === 1 ?
        <>
          <hr/>
          <h3>ip: {ip}</h3>
          <h3>countryCode: {countryCode}</h3>
          <h3>country: {country}</h3>
          <h3>region: {region}</h3>
          <hr/>
        </>  
      :
        <></>
      }
      
    </div>
  )
}
