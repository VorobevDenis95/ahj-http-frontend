const createRequest = async (url, options = {}) => {
    try {
        const responce = await fetch(url, options);
        if (!responce.ok) {
          throw new Error('error'); 
        }
        const data = await responce.json();
        return data;
        
    } catch (error) {
        throw error;
    }
};

export default createRequest;
