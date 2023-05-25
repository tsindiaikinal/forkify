import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const trimArray = function (arr) {
  return arr.map(el => el.trim());
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(uploadData),
    };

    const fetchMethod = uploadData ? fetch(url, options) : fetch(url);

    const res = await Promise.race([fetchMethod, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} Error code (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
};

/* export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} Error code (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
}; */

/* export const sendJSON = async function (url, uploadData) {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(uploadData),
    };
    const res = await Promise.race([fetch(url, options), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} Error code (${res.status})`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
 */
