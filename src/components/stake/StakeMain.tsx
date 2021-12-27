import React, { useState } from "react"
import { Trans } from '@lingui/macro';
import { Box, Paper } from '@material-ui/core';
import { Flex, Form, InputBase } from '@chia/core';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useToggle } from 'react-use';
import { Button, Divider, Menu, MenuItem, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get_plots } from '../../modules/fullnodeMessages';

import {
  get_address,
  send_transaction,
  farm_block,
} from '../../modules/message';
import { /* mojo_to_chia_string, */ chia_to_mojo } from '../../util/chia';



const StyledInputBase = styled(InputBase)`
  min-width: 15rem;
`;


export default function StakeMain() {

    type FormData = {
        amount: string;
    };

    const methods = useForm<FormData>({
        shouldUnregister: false,
        defaultValues: {
          amount: '',
        },
    });

    async function handleSubmit(values: FormData) {
      if (plotPublicKey.startsWith("---")) {
        alert("Must select a publicKey!!!");
        return;
      }

      let amount = values.amount;
      let amountInt = parseInt(amount);
      if (isNaN(amountInt) || (amountInt < 1)) {
        alert("Must input a valid quantity!!!");
        return;
      }

      // console.log("get_walletid");
      // const wallet_id = useSelector((state: RootState) => state.wallet_menu.id);
      // console.log(wallet_id);

      const amountValue = Number.parseFloat(chia_to_mojo(amount));
      let address =  plotPublicKey;
      if (address.startsWith('0x') || address.startsWith('0X')) {
        address = address.slice(2);
      }

      console.log(amountValue);
      console.log(address);

      dispatch(send_transaction(1, amountValue, 0, address));
    }



    //StakeSelect
    const [plotPublicKey, setPlotPublicKey] = useState("----");
    const [values, setValues] = useState([" ", " "]);

    const dispatch = useDispatch();
    const [open, toggleOpen] = useToggle(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      toggleOpen();
      
      const data = await dispatch(get_plots());
      let plots = data.plots;
      let publickey = plots.map((x) => {
        return x["farmer_public_key"];
      });
      setValues(Array.from(new Set(publickey)));
    };

    const handleClose = () => {
      setAnchorEl(null);
      toggleOpen();
    };

    function handleSelect(value: string) {
      toggleOpen();
      setPlotPublicKey(value);
    }


    return (
        <Flex flexDirection="column" gap={3}>

            <Typography variant="body1" color="textSecondary">
            Please select your staking address and send KIK to it.
            </Typography>

            <Flex>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} endIcon={<ExpandMore />}>
                {plotPublicKey}
              </Button>

              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                {values.map((item) => (
                  <MenuItem
                    key={item}
                    onClick={() => handleSelect(item)}
                    selected={item === plotPublicKey}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Flex>

            <Form methods={methods} onSubmit={handleSubmit}>
            <Paper elevation={0} variant="outlined">
                <Flex alignItems="center" gap={1}>
                  <Box/>
                  <StyledInputBase name="amount" placeholder='Amount' fullWidth/>
                </Flex>
            </Paper>

            <br/>

            <Button variant="contained" color="primary" type="submit"> 
            <Trans>Send</Trans>
            </Button>
            </Form>

        </Flex>
    );
}