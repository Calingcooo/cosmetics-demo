// components/CookieTest.tsx
export function CookieTest() {
    const testCookies = async () => {
      // Test 1: Check if cookie exists via API
      const apiResponse = await fetch('/api/debug/cookies', {
        credentials: 'include'
      });
      const apiData = await apiResponse.json();
      console.log('API sees cookies:', apiData);
  
      // Test 2: Check if cookie exists in document.cookie
      console.log('document.cookie:', document.cookie);
  
      // Test 3: Make a request that should include cookie
      const cartResponse = await fetch('/api/cart/me', {
        credentials: 'include'
      });
      console.log('Cart response status:', cartResponse.status);
    };
  
    return (
      <button onClick={testCookies} className="p-2 bg-blue-500 text-white">
        Test Cookies
      </button>
    );
  }