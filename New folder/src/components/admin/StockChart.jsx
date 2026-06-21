import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function StockChart({ data }) {
    return (
        <div className="card p-3 shadow-sm">
            <h5 className="mb-3">Stock Overview</h5>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#198754" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}