import Image from "next/image";
import Head from "next/head";
import Navbar from "../components/Navbar";
import UserList from "@/components/UserList";
import AddUser from "@/components/AddUser";


export default function Home() {
  return (
    
    <div> 
      <Navbar /> 
      <main>
        <AddUser />
        <UserList />
      </main>
    </div>
  );
}
