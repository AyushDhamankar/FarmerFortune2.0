import React from "react";
import Card from "../common/Card";
import { useState, useEffect } from "react";

const MyPost = ({ state }) => {
  const [farmerPosts, setFarmerPosts] = useState([]);
  const [role, setRole] = useState();

  async function getFarmerPost(length) {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();
    const filteredPosts = [];

    for (let i = 0; i < length; i++) {
      const farmerPost = await contract.methods.Farmer_Post_Array(i).call();
      console.log(`Farmer_Post[${i}]:`, farmerPost);

      if (
        farmerPost.Farmer_address.toLowerCase() === accounts[0].toLowerCase()
      ) {
        farmerPost.id = farmerPost.Farmer_Post_id;
        farmerPost.price = farmerPost.Farmer_price;
        farmerPost.transaction_id = farmerPost.Farmer_Post_id;
        filteredPosts.push(farmerPost);
      }
    }
    setFarmerPosts(filteredPosts);
    console.log(filteredPosts);
  }

  async function getDistributorPost(length) {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();
    const filteredPosts = [];

    for (let i = 0; i < length; i++) {
      const farmerPost = await contract.methods.Distributor_Post_Array(i).call();
      console.log(`Farmer_Post[${i}]:`, farmerPost);

      if (
        farmerPost.Distributor_address.toLowerCase() === accounts[0].toLowerCase()
      ) {
        farmerPost.id = farmerPost.Distributor_Post_id;
        farmerPost.price = farmerPost.Distributor_price;
        farmerPost.transaction_id = farmerPost.transactions_id;
        filteredPosts.push(farmerPost);
      }
    }
    setFarmerPosts(filteredPosts);
    console.log(filteredPosts);
  }

  async function getVendorPost(length) {
    const { contract, web3 } = state;
    const accounts = await web3.eth.getAccounts();
    const filteredPosts = [];

    for (let i = 0; i < length; i++) {
      const farmerPost = await contract.methods.Vendor_Post_Array(i).call();
      console.log(`Farmer_Post[${i}]:`, farmerPost);

      if (
        farmerPost.Vendor_address.toLowerCase() === accounts[0].toLowerCase()
      ) {
        farmerPost.id = farmerPost.Vendor_Post_id;
        farmerPost.price = farmerPost.Vendor_price;
        farmerPost.transaction_id = farmerPost.transactions_id;
        filteredPosts.push(farmerPost);
      }
    }
    setFarmerPosts(filteredPosts);
    console.log(filteredPosts);
  }

  // Function to fetch Farmer_Posts
  async function fetchFarmerPosts() {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      const user = await contract.methods.User_Type_Mapping(accounts[0]).call();

      let length;
      if (user.role == 0) {
        length = await contract.methods.Farmer_Post_Counter().call();
        getFarmerPost(length);
      } else if (user.role == 1) {
        length = await contract.methods.Distributor_Post_Counter().call();
        getDistributorPost(length);
      } else if (user.role == 2) {
        length = await contract.methods.Vendor_Post_Counter().call();
        getVendorPost(length);
      }
      console.log("Farmer_Post_Array Length:", length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getUser() {
    try {
      const { contract, web3 } = state;
      const accounts = await web3.eth.getAccounts();
      
      // Check if there are accounts available
      if (accounts.length === 0) {
        console.error("No Ethereum accounts available");
        return;
      }
  
      const user = await contract.methods.User_Type_Mapping(accounts[0]).call();
      setRole(user.role);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error (e.g., show a message to the user)
    }
  }
  
  useEffect(() => {
    getUser();
    fetchFarmerPosts();
  }, [state]);
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="text-5xl md:text-[75px] md:leading-snug font-bold py-10">
        MY POSTS
      </div>

      <div className="flex flex-wrap justify-center items-center gap-10 py-10">
        {farmerPosts.map((post, index) => (
          <>
            <Card
              state={state}
              id={post.id}
              img={post.img}
              title={post.Product_name}
              desc={post.Product_description}
              owner={"Me"}
              quantity={post.Product_quantity}
              price={post.price}
              myposts={true}
              transaction_id={post.transaction_id}
              role={role}
            />
          </>
        ))}
      </div>
    </section>
  );
};

export default MyPost;
