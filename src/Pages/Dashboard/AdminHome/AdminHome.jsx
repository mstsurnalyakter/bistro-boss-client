import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { MdSell } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data:stats={},isLoading } = useQuery({
      queryKey: ["admin-stats"],
      queryFn: async () =>{
        const { data } = await axiosSecure.get("/admin-stats");
        return data
      }
    });


    const { data: chartData=[], isLoading: chartDataLoading } = useQuery({
      queryKey: ["/order-stats"],
      queryFn: async () => {
        const { data } = await axiosSecure.get("/order-stats");
        return data;
      },
    });

    console.log(chartData);

    if (isLoading || chartDataLoading) {
      return <p>Loading..........</p>;
    }

    // custom shape for the bar chart
    const getPath = (x, y, width, height) => {
      return `M${x},${y + height}C${x + width / 3},${y + height} ${
        x + width / 2
      },${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
        x + width
      }, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
      // eslint-disable-next-line react/prop-types
      const { fill, x, y, width, height } = props;

      return (
        <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      );
    };


    // custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    const pieChartData = chartData?.map(data=>{
      return {name:data?.category,value:data?.revenue}
    })


  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi,Welcome </span>
        {user?.displayName ? user?.displayName : "Back"}
      </h2>
      <div className="stats shadow mt-5">
        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <FaMoneyCheckDollar />
          </div>
          <div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${stats?.revenue}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <HiUserGroup />
          </div>
          <div>
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">{stats?.users}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <MdSell />
          </div>
          <div>
            <div className="stat-title">Orders</div>
            <div className="stat-value text-secondary">{stats?.orders}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <CiBookmark />
          </div>
          <div>
            <div className="stat-title">Menu Items</div>
            <div className="stat-value text-secondary">{stats?.menuItems}</div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="w-1/2">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default AdminHome