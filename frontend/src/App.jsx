import React, { useState } from "react";
import axios from "axios";

function App() {
    const [handle, setHandle] = useState("");
    const [response, setResponse] = useState(null);

    const tokenizePfp = async () => {
        try {
            const result = await axios.post("http://localhost:3001/agent", { handle });
            setResponse(result.data);
        } catch (error) {
            console.error("Failed:", error);
        }
    };

    return (
        <div>
            <h1>Twitter PFP Tokenizer</h1>
            <input
                type="text"
                placeholder="Enter Twitter Handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
            />
            <button onClick={tokenizePfp}>Tokenize PFP</button>
            {response && (
                <div>
                    <img src={response.pfpUrl} alt="NFT PFP" />
                    <p>Transaction: {response.txHash}</p>
                </div>
            )}
        </div>
    );
}

export default App;
