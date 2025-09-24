module.exports = {
    apps: [
        {
            name: "consulat_app",
            script: "node_modules/next/dist/bin/next",
            args: "start",
            instances: "max", // Use max for automatic load balancing based on available CPUs
            exec_mode: "cluster", // Allow instances to share the same port
            watch: false, // Don't watch for file changes in test production
            max_memory_restart: "512M", // Restart if memory usage exceeds 512MB
            env: {
                NODE_ENV: "production",
                PORT: 3001,
            },
            // Control resource usage
            node_args: "--max-old-space-size=512", // Limit Node.js memory usage
            // Merge logs instead of creating multiple files
            merge_logs: true,
            // Format logs with timestamp
            time: true,
            log_date_format: "DD-MM-YYYY HH:mm:ss Z",
            // Define log paths
            error_file: "/var/log/consulat_app/error.log",
            out_file: "/var/log/consulat_app/out.log",
            // Enable graceful shutdown
            kill_timeout: 3000,
            // Restart app if it crashes
            autorestart: true,
            // Restart after deployment
            restart_delay: 4000,
        },
    ],
};
