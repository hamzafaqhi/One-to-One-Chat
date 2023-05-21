const bankDetailDto = (data) => {
    return {
      id: data?.id ?? null,
      bank_name: data?.bank_name ?? null,
      account_number: data?.account_number ?? null,
      account_holder_name: data?.account_holder_name ?? null,
      createdAt: data?.createdAt ?? null,
      updatedAt: data?.updatedAt ?? null,
    };
  };

  module.exports = bankDetailDto;
  