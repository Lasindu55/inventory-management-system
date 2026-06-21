import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function ProductChart({ products }) {

    const data = [
        {
            name: "Low Stock",
            value: products.filter(p => p.quantity <= 5).length
        },
        {
            name: "Medium Stock",
            value: products.filter(p => p.quantity > 5 && p.quantity <= 15).length
        },
        {
            name: "High Stock",
            value: products.filter(p => p.quantity > 15).length
        }
    ];

    return (
        <div className="card shadow-sm p-3">
            <h5 className="mb-3">📊 Stock Overview</h5>

            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0d6efd" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}