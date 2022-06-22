export async function getStaticProps(context){
    const { params } = context
    const res = await fetch(`http://localhost:4000/api/1.0/host/${params.id}`);
    const data = await res.json();
    return {
      props: { host: data }
    }
  }
  
  
  export async function getStaticPaths() {
    const res = await fetch('http://localhost:4000/api/1.0/hosts/all');
    const json = await res.json();
    const data = json.data;
    const paths = data.map(host =>{
      return {
          params: {
              id : `${host.host_id}`
          }
      }
    })
    return {
      paths,
      fallback: false,
    };
  }  