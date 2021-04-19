import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import cardanoLogo from 'enl-images/crypto/cardano.png';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

class TransferCryptoWidget extends PureComponent {
  state = {
    address: 'fcno485oreifj90dfsfk3012ikreopjdfs9fj',
    amount: 1,
    coin: 'ADA'
  };

  handleChangeAmount = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeCoin = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeAddress = event => {
    this.setState({ address: event.target.value });
  };

  render() {
    const { classes, intl } = this.props;
    const { address, amount, coin } = this.state;
    return (
      <PapperBlock
        whiteBg
        noMargin
        title={intl.formatMessage(messages.transferCoin)}
        icon="subdirectory_arrow_right"
        desc=""
      >
        <Grid container spacing={2}>
          <Grid item sm={8} xs={6}>
            <FormControl className={classes.formControlTrade}>
              <InputLabel htmlFor="coin-simple">Coin</InputLabel>
              <Select
                value={coin}
                onChange={this.handleChangeCoin}
                inputProps={{
                  name: 'coin',
                  id: 'coin-simple',
                }}
              >
                <MenuItem value="BNB">BNB (Binance)</MenuItem>
                <MenuItem value="BTC">BTC (Bitcoin)</MenuItem>
                <MenuItem value="BCN">BCN (Bytecoin)</MenuItem>
                <MenuItem value="ADA">ADA (Cardano)</MenuItem>
                <MenuItem value="DCR">DCR (Decred)</MenuItem>
                <MenuItem value="ICX">ICX (Iconic)</MenuItem>
                <MenuItem value="IOTA">IOTA (Iota)</MenuItem>
                <MenuItem value="LTC">LTC (Litecoin)</MenuItem>
                <MenuItem value="XMR">XMR (Monero)</MenuItem>
                <MenuItem value="NANO">NANO (Nano Coin)</MenuItem>
                <MenuItem value="NEM">NEM (Nem)</MenuItem>
                <MenuItem value="PPT">PPT (Papulous)</MenuItem>
                <MenuItem value="XRP">XRP (Ripple)</MenuItem>
                <MenuItem value="XLM">XLM (Stellar Lumens)</MenuItem>
                <MenuItem value="STRAT">STRAT (Stratis)</MenuItem>
                <MenuItem value="TRX">TRX (Tron)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={4} xs={6}>
            <FormControl fullWidth className={classes.formControlTrade}>
              <InputLabel htmlFor="adornment-amount">
                <FormattedMessage {...messages.amount} />
              </InputLabel>
              <Input
                className={classes.amount}
                id="adornment-amount"
                value={amount}
                onChange={this.handleChangeAmount('amount')}
                endAdornment={<InputAdornment position="end">{coin}</InputAdornment>}
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormHelperText className={classes.walletLabel}>
          Cardano
          <FormattedMessage {...messages.walletAddress} />
        </FormHelperText>
        <FormControl fullWidth className={classes.formControlTrade}>
          <Input
            id="adornment-address"
            onChange={this.handleChangeAddress}
            value={address}
            startAdornment={(
              <InputAdornment position="start">
                <Avatar alt="bitcoin" src={cardanoLogo} className={classNames(classes.avatar, classes.mc)} />
              </InputAdornment>
            )}
          />
        </FormControl>
        <Divider className={classes.divider} />
        <div className={classes.textRight}>
          <Button color="secondary" variant="contained" className={classes.button}>
            <FormattedMessage {...messages.transfer} />
          </Button>
        </div>
      </PapperBlock>
    );
  }
}

TransferCryptoWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

export default withStyles(styles)(injectIntl(TransferCryptoWidget));
