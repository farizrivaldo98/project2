const opcua = require("node-opcua");

// Membuat koneksi ke server OPC UA
const client = opcua.OPCUAClient.create();

async function main() {
  try {
    // Menghubungkan ke server OPC UA
    await client.connect("opc.tcp://10.126.15.168:4840");

    // Membuat session
    const session = await client.createSession();

    // Membaca nilai dari variabel OPC UA
    const nodesToRead = [
      {
        nodeId: "ns=2;s=Mitsubishi FX5U - EMS IP 100.Tags.Suhu.N08", // Ganti dengan Node ID yang sesuai di server kamu
        attributeId: opcua.AttributeIds.Value,
      },
    ];

    const dataValues = await session.read(nodesToRead);
    console.log("Nilai yang dibaca:", dataValues[0].value.value);

    // Menutup session
    await session.close();

    // Memutuskan koneksi dari server OPC UA
    await client.disconnect();
  } catch (err) {
    console.log("Error:", err.message);
  }
}

main();
