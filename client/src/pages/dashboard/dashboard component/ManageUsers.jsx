import React, { useEffect, useState } from "react";
import useAllUser from "../../../hooks/useAllUser";
import { deleteUser, makeAdmin, removeAdmin } from "../../../api/user.api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Loading from "../../../component/loading/Loading";

const ITEMS_PER_PAGE = 5;

const ManageUsers = () => {
  const { data: allUsers = [], isLoading, refetch } = useAllUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [adminLoading, setAdminLoading] = useState(null);

  const totalPages = Math.ceil(allUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = allUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
  window.scrollTo(0, 0);
  }, []);

  const handleToggleAdmin = async (id, isCurrentlyAdmin) => {
    try {
      setAdminLoading(id);

      if (isCurrentlyAdmin) {
        // 🔴 REMOVE ADMIN CONFIRM
        const result = await Swal.fire({
          title: "Remove admin?",
          text: "This user will lose admin privileges.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, remove",
        });

        if (!result.isConfirmed) return;

        const response = await removeAdmin(id);

        if (response.status === 200) {
          toast.success("Admin removed successfully");
          refetch();
        }
      } else {
        // 🟢 MAKE ADMIN CONFIRM
        const result = await Swal.fire({
          title: "Promote to admin?",
          text: "This user will gain full admin access.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, make admin",
        });

        if (!result.isConfirmed) return;

        const response = await makeAdmin(id);

        if (response.status === 200) {
          toast.success("User promoted to admin");
          refetch();
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
      console.error(error);
    } finally {
      setAdminLoading(null);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await deleteUser(id);

      if (res.status === 200) {
        toast.success("User deleted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error(error);
    }
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users ({allUsers.length})</h2>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>SL</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, index) => {
              const isAdmin = user.role.includes("admin");
              return (
                <tr key={user._id}>
                  <td>{startIndex + index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-circle w-10 h-10">
                        <img
                          src={
                            user.photo ||
                            `https://ui-avatars.com/api/?name=${user.name}&background=random`
                          }
                          alt={user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    {isAdmin ? (
                      <span className="badge badge-success">Admin</span>
                    ) : (
                      <span className="badge badge-outline">User</span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleToggleAdmin(user._id, isAdmin)}
                        disabled={adminLoading === user._id}
                        className={`btn btn-xs ${
                          isAdmin ? "btn-warning" : "btn-info"
                        }`}
                      >
                        {adminLoading === user._id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : isAdmin ? (
                          "Remove Admin"
                        ) : (
                          "Make Admin"
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              className={`join-item btn btn-sm ${
                currentPage === page + 1 ? "btn-active" : ""
              }`}
              onClick={() => setCurrentPage(page + 1)}
            >
              {page + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
