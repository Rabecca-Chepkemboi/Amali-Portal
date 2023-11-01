export const registerUser = async (formData: UserData) => {
  const url = '/api/register';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      let error = await response.text();
      return { error }; 
    }
    const result = await response.json();
    return { success: result.message }; 
  } catch (error: any) {
    return { error: error.message };
  }
};


export const loginUser = async (loginData: LoginData) => {
  const url = '/api/login';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (!response.ok) {
      const error = await response.text();
      return { error }; 
    }
    const result = await response.json();
    return { success: result.message, result }; 
  } catch (error: any) {
    return { error: error.message }; 
  }
};

export const getAthletes = async () => {
  const url = '/api/get-athletes';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return null; 
    }
  } catch (error: any) { 
    return null; 
  }
}

export const createDonation = async (DonationData: any) => {
  try {
    const response = await fetch('/api/create-donation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DonationData),
    });
    if(!response.ok){
      return{error:'an error occurred'}
    }
    const result = await response.json();
    return result
  } catch (error: any) {
    return {error:error.message};
  }
};


export const createContact = async (formData: any) => {
  try {
    const response = await fetch('/api/create-contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if(!response.ok){
      return{error:'an error occurred'}
    }
    const result = await response.json();
    return result
  } catch (error: any) {
    return {error:error.message};
  }
};


export const getDonation= async()=>{
  const url ='/api/get-donation/'
  try{
      const response = await fetch(url)
      const result = await response.json();
      return result;
  }
  catch(error:any){
      return error.message
  }
}
