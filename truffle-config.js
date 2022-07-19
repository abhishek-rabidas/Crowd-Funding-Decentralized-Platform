module.exports = {
    migrations_directory: "./src/backend/migrations",
    contracts_directory: "./src/backend/contracts",
    contracts_build_directory: "./src/backend/output",
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
        }
    },
    compilers: {
        solc: {
            version: "0.8.4"
        }
    }
};