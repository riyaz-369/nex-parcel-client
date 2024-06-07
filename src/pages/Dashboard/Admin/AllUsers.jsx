import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
import Container from "../../../components/Shared/Container";
import AllUsersRow from "../../../components/TableRows/AllUsersRow";
import { useState } from "react";
import Pagination from "../../../components/Dashboard/Paginations/Pagination";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [itemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);

  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage, itemPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure("/users", {
        params: { page: currentPage, size: itemPerPage },
      });
      setItemsCount(data.count);
      return data.users;
    },
  });

  const numberOfPage = Math.ceil(itemsCount / itemPerPage);
  const pages = [...Array(numberOfPage).keys()].map((element) => element + 1);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <section>
      <Container>
        <h4 className="text-3xl">All Users: {itemsCount}</h4>
        <Helmet>
          <title>Dashboard - All Users</title>
        </Helmet>
        <div className="border">
          <table className="table">
            <thead>
              <tr className="text-base">
                <th>SL</th>
                <th>Name</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Number of parcel Booked</th>
                <th>Total Spent Amount</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, idx) => (
                <AllUsersRow
                  key={user._id}
                  user={user}
                  idx={idx}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
        {/* PAGINATION */}
        <div>
          <Pagination
            handlePagination={handlePagination}
            currentPage={currentPage}
            pages={pages}
            numberOfPage={numberOfPage}
          />
        </div>
      </Container>
    </section>
  );
};

export default AllUsers;
