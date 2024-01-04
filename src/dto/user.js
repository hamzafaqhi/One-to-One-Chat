const userDto = (data) => {
    return {
        id: data?.id ?? null,
        first_name: data?.first_name ?? null,
        last_name: data?.last_name ?? null,
        email: data?.email ?? null,
        createdAt: data?.createdAt ?? null,
        updatedAt: data?.updatedAt ?? null,
    };
};

module.exports = userDto;
  