export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} Error code (${res.status})`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
